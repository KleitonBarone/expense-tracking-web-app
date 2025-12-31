# 🚀 Expense Tracking Backend

The backend of the Expense Tracking Web App is a fast and lightweight API powered by [Hono](https://hono.dev/), [Bun](https://bun.sh/), and [Drizzle ORM](https://orm.drizzle.team/).

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) installed.

### Installation
```bash
bun install
```

### Environment Variables
Create a `.env` file with the following variables:
```env
KINDE_DOMAIN=your_kinde_domain
KINDE_CLIENT_ID=your_kinde_client_id
KINDE_CLIENT_SECRET=your_kinde_client_secret
KINDE_REDIRECT_URI=http://localhost:3000/api/v1/callback
KINDE_LOGOUT_REDIRECT_URI=http://localhost:3000

DATABASE_URL=postgres://postgres:password@localhost:5432/expense_tracker
```

### Running the Server
```bash
# Development mode (with watch)
bun run dev

# Production mode
bun run start
```

## 🛤️ API Endpoints

### Auth
- `GET /api/v1/login`: Redirect to Kinde login page.
- `GET /api/v1/register`: Redirect to Kinde registration page.
- `GET /api/v1/callback`: Kinde authentication callback.
- `GET /api/v1/logout`: Log out the user.
- `GET /api/v1/me`: Get details of the currently logged-in user.

### Expenses
- `GET /api/v1/expenses`: Get all expenses.
- `POST /api/v1/expenses`: Create a new expense.
- `GET /api/v1/expenses/:id`: Get a specific expense.
- `DELETE /api/v1/expenses/:id`: Delete an expense.
- `GET /api/v1/expenses/total-spent`: Get the total amount spent.
