import { userQueryOptions } from "@/lib/api";
import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";

const Login = () => {
    return <div>You have to login first
        <a href="/api/v1/login">Login</a>
    </div>
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