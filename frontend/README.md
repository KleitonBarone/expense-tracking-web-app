# 🎨 Expense Tracking Frontend

The frontend of the Expense Tracking Web App is a modern, responsive React application built with [Vite](https://vitejs.dev/) and [TanStack](https://tanstack.com/) libraries.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **Forms**: [TanStack Form](https://tanstack.com/form)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Installation
```bash
bun install
```

### Development
```bash
bun run dev
```
The app will be available at `http://localhost:5173`.

### Building for Production
```bash
bun run build
```
The build artifacts will be stored in the `dist/` directory, which is served by the backend in production.

## 📁 Structure

- `src/components`: UI components powered by Radix UI and Tailwind.
- `src/routes`: Application pages and routing logic using TanStack Router.
- `src/lib`: API clients and shared utility functions.
- `src/index.css`: Global styles and Tailwind configuration.
