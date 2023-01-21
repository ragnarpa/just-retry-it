import { default as promiseRetry } from "promise-retry";
import { OperationOptions } from "retry";

export type RetryOptions<T> = OperationOptions & {
  errorHandler?: ((error: unknown) => Promise<T | void>) | void;
};

export default async function retry<T>(
  op: () => Promise<T>,
  opts?: RetryOptions<T>
): Promise<T> {
  const retryable = async (retry: (e: Error) => never): Promise<T> => {
    try {
      return await op();
    } catch (error) {
      if (typeof opts?.errorHandler === "function") {
        await opts.errorHandler(error);
      }

      retry(error as Error);
    }
  };

  return promiseRetry(retryable, opts);
}
