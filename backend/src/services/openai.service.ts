export interface RealtimeSessionOptions {
  model?: string;
  voice?: string;
  // Optionally constrain capabilities
  modalities?: string[];
}

export async function createRealtimeSession(options: RealtimeSessionOptions = {}) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY');
  }

  const model = options.model || 'gpt-4o-realtime-preview-2024-12-17';
  const voice = options.voice || 'verse';

  const response = await fetch('https://api.openai.com/v1/realtime/sessions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      voice,
      // You can pass additional config here based on the docs
      // e.g., modalities: options.modalities
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI Realtime session creation failed: ${response.status} ${text}`);
  }

  const json = await response.json();
  return json;
}
