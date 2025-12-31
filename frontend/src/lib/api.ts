import { hc } from "hono/client";
import type { ApiRoutes } from "@server/app";
import { queryOptions } from "@tanstack/react-query";


const client = hc<ApiRoutes>("/");

export const api = client.api;

async function getCurrentUser() {
  const response = await api.v1.me.$get();
  if (!response.ok) {
    throw new Error("Failed to fetch current user");
  }
  const data = await response.json();
  return data;
}

export const userQueryOptions = queryOptions({
    queryKey: ["get-current-user"],
    queryFn: getCurrentUser,
    staleTime: Infinity,
});