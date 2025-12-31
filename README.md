# 💸 Expense Tracking Web App

A modern, full-stack expense tracking application built with **Bun**, **Hono**, **React**, and **PostgreSQL**.

## 🛠️ Tech Stack

### Backend
- **Runtime**: [Bun](https://bun.sh/)
- **Framework**: [Hono](https://hono.dev/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Validation**: [Zod](https://zod.dev/)
- **Auth**: [Kinde](https://kinde.com/)

### Frontend
- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **Forms**: [TanStack Form](https://tanstack.com/form)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine.
- (Optional) [Bun](https://bun.sh/) for local development.

### Running with Docker Compose (Recommended)

The easiest way to get the app running is using Docker Compose.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/KleitonBarone/expense-tracking-web-app.git
   cd expense-tracking-web-app
   ```

2. **Environment Variables**:
   Create a `.env` file in the **root** directory and add your Kinde and Database credentials:
   ```env
   # Kinde Auth
   KINDE_DOMAIN=your_kinde_domain
   KINDE_CLIENT_ID=your_kinde_client_id
   KINDE_CLIENT_SECRET=your_kinde_client_secret
   KINDE_REDIRECT_URI=http://localhost:3000/api/v1/callback
   KINDE_LOGOUT_REDIRECT_URI=http://localhost:3000

   # Database
   DATABASE_URL=postgres://postgres:password@db:5432/expense_tracker
   ```

3. **Build and Run**:
   ```bash
   docker-compose up --build
   ```

The app will be available at `http://localhost:3000`.

---

## 📁 Project Structure

```text
.
├── backend/            # Hono API server with Drizzle ORM
│   ├── db/             # Database schema and migrations
│   ├── routes/         # API Route definitions (auth, expenses)
│   ├── app.ts          # Main application setup
│   └── index.ts        # Server entry point
├── frontend/           # React + Vite application
│   ├── src/
│   │   ├── components/ # Premium UI components
│   │   ├── routes/     # TanStack Router pages
│   │   └── lib/        # Shared utilities and API client
└── README.md           # Root documentation
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
