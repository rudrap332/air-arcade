# Air Arcade

A modern web application starter built with [Vite](https://vitejs.dev/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), and [Radix UI](https://www.radix-ui.com/).  
This project is designed for rapid prototyping and scalable production apps, featuring a robust component library, advanced form handling, and beautiful UI utilities.

---

## ✨ Features

- **Vite** for lightning-fast development and builds
- **React 18** with hooks and concurrent features
- **TypeScript** for type safety
- **Tailwind CSS** with plugins for animations and typography
- **Radix UI** primitives for accessible, composable components
- **shadcn/ui**-style component patterns
- **React Router** for client-side routing
- **React Hook Form** and **Zod** for forms and validation
- **TanStack React Query** for data fetching and caching
- **Recharts** for data visualization
- **Embla Carousel** for sliders
- **Lucide Icons** for modern SVG icons
- **Theming** with `next-themes`
- **ESLint** for code quality

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/yourusername/cloud-game-mastery-flow-main.git
cd cloud-game-mastery-flow-main
npm install
# or
yarn install
```

### Development

Start the local development server:

```sh
npm run dev
# or
yarn dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```sh
npm run build
# or
yarn build
```

### Preview Production Build

```sh
npm run preview
# or
yarn preview
```

### Linting

```sh
npm run lint
# or
yarn lint
```

---

## 🗂️ Project Structure

```
cloud-game-mastery-flow-main/
├── public/             # Static assets
├── src/                # Application source code
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components (if using file-based routing)
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   └── ...             # Other feature folders
├── package.json        # Project metadata and scripts
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
└── ...
```

---

## 🛠️ Main Dependencies

- **UI & Styling:** `tailwindcss`, `@tailwindcss/typography`, `tailwindcss-animate`, `clsx`, `class-variance-authority`
- **Components:** `@radix-ui/*`, `shadcn/ui` patterns, `lucide-react`, `embla-carousel-react`
- **Forms & Validation:** `react-hook-form`, `@hookform/resolvers`, `zod`
- **Routing:** `react-router-dom`
- **State/Data:** `@tanstack/react-query`
- **Charts:** `recharts`
- **Theming:** `next-themes`
- **Utilities:** `date-fns`, `cmdk`, `input-otp`, `vaul`, `sonner`
- **Linting/Type Checking:** `eslint`, `typescript`, `@types/*`

---

## 📦 Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Lint code

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> Built with ❤️ using Vite, React, TypeScript, Tailwind CSS, and Radix UI.
