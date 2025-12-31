import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";

interface Context {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<Context>()({
  component: Root,
});

function Root() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <NavBar />
      <main className="max-w-4xl mx-auto p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}

function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-4xl mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl tracking-tight">ExpenseApp</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link 
              to="/" 
              className="transition-colors hover:text-foreground/80 text-foreground/60 [&.active]:text-foreground [&.active]:font-semibold"
            >
              Home
            </Link>
            <Link 
              to="/expenses" 
              className="transition-colors hover:text-foreground/80 text-foreground/60 [&.active]:text-foreground [&.active]:font-semibold"
            >
              Expenses
            </Link>
            <Link 
              to="/create-expense" 
              className="transition-colors hover:text-foreground/80 text-foreground/60 [&.active]:text-foreground [&.active]:font-semibold"
            >
              Create
            </Link>
            <Link 
              to="/about" 
              className="transition-colors hover:text-foreground/80 text-foreground/60 [&.active]:text-foreground [&.active]:font-semibold"
            >
              About
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link 
            to="/profile" 
            className="transition-colors hover:text-foreground/80 text-foreground/60 [&.active]:text-foreground [&.active]:font-semibold"
          >
            Profile
          </Link>
        </div>
      </div>
    </header>
  );
}
