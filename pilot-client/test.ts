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
      true: httpSubscriptionLink({
        url: "http://localhost:3000/trpc",
        connectionParams: {},
      }),
    }),
  ],
});

const result = await client.pilot.get_previous_cases.query({ id: "HAVAS" });
console.log(result);

const unsub = client.agent.subscribe({
  query: "Can you analyse me 'HAVAS'?",
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

    if (e.type === "file_generated") {
      console.log(e.file);
    }
  },
  onError: (err) => {
    console.error(err);
    unsub.unsubscribe();
  },
  onComplete: console.log,
  onConnectionStateChange: console.log,
  onStarted: console.log,
  onStopped: console.log,
});
