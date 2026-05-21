import ky, { HTTPError, type Options } from "ky";
import * as z from "zod";
import { errAsync, okAsync, ResultAsync } from "neverthrow";

type FetchError =
  | { code: "HTTP_ERROR"; error: HTTPError }
  | { code: "PARSE_ERROR"; error: z.ZodError };

export const fetcher = {
  fetch(url: string, options?: Options): ResultAsync<ArrayBuffer, FetchError> {
    return ResultAsync.fromPromise(
      ky.get(url, options).arrayBuffer(),
      (e) => ({ code: "HTTP_ERROR" as const, error: e as HTTPError }),
    );
  },

  fetch_json<T>(
    url: string,
    validator: z.ZodType<T>,
    options?: Options,
  ): ResultAsync<T, FetchError> {
    return ResultAsync
      .fromPromise(
        ky.get(url, options).json(),
        (e) => ({ code: "HTTP_ERROR" as const, error: e as HTTPError }),
      )
      .andThen((json) => {
        const result = validator.safeParse(json);
        return result.success
          ? okAsync(result.data)
          : errAsync({ code: "PARSE_ERROR" as const, error: result.error });
      });
  },

  post_json<T, U = unknown>(
    url: string,
    body: U,
    validator: z.ZodType<T>,
    options?: Options,
  ): ResultAsync<T, FetchError> {
    return this.fetch_json(url, validator, {
      ...options,
      method: "post",
      json: body,
    });
  },
};
