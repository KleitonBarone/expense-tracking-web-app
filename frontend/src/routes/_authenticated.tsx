import { userQueryOptions } from "@/lib/api";
import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
    return (
        <div className="flex justify-center py-24">
            <Card className="w-full max-w-md shadow-md border-2">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Authentication Required</CardTitle>
                    <CardDescription>
                        You must be logged in to access this page and manage your expenses.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <div className="p-4 rounded-full bg-muted/50 border mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="h-10 w-10 text-muted-foreground"
                        >
                          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                          <polyline points="10 17 15 12 10 7" />
                          <line x1="15" x2="3" y1="12" y2="12" />
                        </svg>
                    </div>
                    <Button asChild className="w-full h-11 text-base font-semibold transition-all hover:shadow-md">
                        <a href="/api/v1/login">Login Now</a>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

const Component = () => {
    const { user } = Route.useRouteContext();
    if (!user) {
        return <Login />
    }

    return <Outlet />
}

export const Route = createFileRoute("/_authenticated")({
    beforeLoad: async ({context}) => {
        const { queryClient } = context;

        try {
            const data = await queryClient.fetchQuery(userQueryOptions);
            return data;
        } catch (error) {
            return {
                user: null,
            }
        }
    },
    component: Component,
})