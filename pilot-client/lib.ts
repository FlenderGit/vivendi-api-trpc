import {
  createTRPCProxyClient,
  httpLink,
  httpSubscriptionLink,
  splitLink,
  TRPCClientError,
} from "@trpc/client";
import { ResultAsync } from "neverthrow";
import type { AppRouter } from "../server/src/router.ts";

const URL_API = "http://localhost:3000/trpc";
export const client = createTRPCProxyClient<AppRouter>({
  links: [
    splitLink({
      condition: (op) => op.type === "subscription",
      false: httpLink({ url: URL_API }),
      true: httpSubscriptionLink({ url: URL_API }),
    }),
  ],
});

export function greet(name: string) {
  return safe(client.greet.query({ name }));
}

export function currency() {
  return safe(
    client.currency.get_currency_rate.query({ base: "EUR", quote: "USD" }),
  );
}

export function pilot() {
  return safe(client.pilot.get_previous_cases.query({ id: "10" }));
}

import type { inferRouterOutputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<AppRouter>;
type AgentEvent = RouterOutput["agent"];

type ExtractAsyncIterable<T> = T extends AsyncIterable<infer U> ? U : never;

export function agent(
  query: string,
  onEvent: (data: ExtractAsyncIterable<AgentEvent>) => void,
) {
  const unsubscribe = client.agent.subscribe({ query }, {
    onData: (e) => onEvent(e),
    onError: (err) => console.error("Subscription error:", err),
  });
  return unsubscribe;
}

// API sqlite data.gouv

export function embedding() {
  safe(client.embedding.query());
}

export function safe<T>(promise: Promise<T>) {
  return ResultAsync.fromPromise(promise, (e) => {
    if (e instanceof TRPCClientError) {
      return { code: e.data.code, message: e.message };
    }
    return { message: String(e), code: "UNKNOWN" };
  });
}
