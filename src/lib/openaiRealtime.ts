export type OpenAIRealtimeConnection = {
  peerConnection: RTCPeerConnection;
  dataChannel?: RTCDataChannel;
  stop: () => void;
  sendText: (text: string) => void;
};

type ConnectOptions = {
  backendBaseUrl?: string; // e.g. http://localhost:5000/api/v1
  model?: string;
  voice?: string;
  audioElement?: HTMLAudioElement | null;
};

export async function connectOpenAIRealtime(options: ConnectOptions = {}): Promise<OpenAIRealtimeConnection> {
  const backendBaseUrl = options.backendBaseUrl || (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';
  const model = options.model || 'gpt-4o-realtime-preview-2024-12-17';
  const voice = options.voice || 'verse';

  // 1) Get ephemeral session from backend
  const sessionRes = await fetch(`${backendBaseUrl}/webrtc/openai/ephemeral`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, voice })
  });
  if (!sessionRes.ok) {
    throw new Error(`Failed to create OpenAI Realtime session: ${sessionRes.status}`);
  }
  const { session } = await sessionRes.json();
  const clientSecret = session?.client_secret?.value;
  if (!clientSecret) throw new Error('Missing client_secret from OpenAI session');

  // 2) Prepare WebRTC PeerConnection
  const pc = new RTCPeerConnection();

  // Remote audio sink
  const remoteStream = new MediaStream();
  pc.ontrack = (event) => {
    event.streams[0].getTracks().forEach((t) => remoteStream.addTrack(t));
    if (options.audioElement) {
      options.audioElement.srcObject = remoteStream;
      // Some browsers need a play() call post user gesture
      options.audioElement.play().catch(() => {});
    }
  };

  // Data channel for events (optional)
  const dc = pc.createDataChannel('oai-events');
  dc.onopen = () => {};
  dc.onmessage = () => {};

  // Get user mic (optional; comment out to be receive-only)
  try {
    const mic = await navigator.mediaDevices.getUserMedia({ audio: true });
    mic.getTracks().forEach((track) => pc.addTrack(track, mic));
  } catch (_) {
    // Mic access denied; continue as receive-only
  }

  // 3) Create SDP offer
  const offer = await pc.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: false });
  await pc.setLocalDescription(offer);

  // 4) Send SDP to OpenAI using the ephemeral client secret
  const sdpRes = await fetch(`https://api.openai.com/v1/realtime?model=${encodeURIComponent(model)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${clientSecret}`,
      'Content-Type': 'application/sdp'
    },
    body: offer.sdp || ''
  });
  if (!sdpRes.ok) {
    const text = await sdpRes.text();
    throw new Error(`OpenAI SDP exchange failed: ${sdpRes.status} ${text}`);
  }
  const answer = { type: 'answer', sdp: await sdpRes.text() } as RTCSessionDescriptionInit;
  await pc.setRemoteDescription(answer);

  const stop = () => {
    try { pc.getSenders().forEach((s) => s.track?.stop()); } catch {}
    try { pc.close(); } catch {}
  };

  const sendText = (text: string) => {
    if (!dc || dc.readyState !== 'open') return;
    const msg = {
      type: 'response.create',
      response: {
        modalities: ['text', 'audio'],
        instructions: text
      }
    };
    dc.send(JSON.stringify(msg));
  };

  return { peerConnection: pc, dataChannel: dc, stop, sendText };
}


