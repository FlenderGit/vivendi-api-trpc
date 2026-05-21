import {
  createTRPCProxyClient,
  httpLink,
  httpSubscriptionLink,
  splitLink,
} from "@trpc/client";
import type { AppRouter } from "../server/src/router.ts";

const client = createTRPCProxyClient<AppRouter>({
  links: [
    splitLink({
      condition: (op) => op.type === "subscription",
      false: httpLink({ url: "http://localhost:3000/trpc" }),
      true: httpSubscriptionLink({ url: "http://localhost:3000/trpc" }),
    }),
  ],
});

const result = await client.pilot.get_previous_cases.query({ id: "HAVAS" });
console.log(result);

client.agent.subscribe({
  query: "Can you gimme the actuality of vivendi?",
}, {
  onData: (e) => {
    if (
      e.type === "raw_model_stream_event" && e.data.type !== "output_text_delta"
    ) {
      if (e.data.type === "response_done") {
        console.log(e.data.response.output);
      } else {
        console.log(e.data);
      }
    }
  },
  onError: console.error,
  onComplete: console.log,
});
