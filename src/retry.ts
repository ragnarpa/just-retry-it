import { default as promiseRetry } from 'promise-retry';
import { OperationOptions } from 'retry';

export default async function retry<T>(
	op: () => Promise<T>,
	errorHandler: ((error: unknown) => Promise<T | void>) | void,
	opts?: OperationOptions,
): Promise<T> {
	const retryable = async (retry: (e: Error) => never): Promise<T> => {
		try {
			return await op();
		} catch (error) {
			if (typeof errorHandler === 'function') {
				await errorHandler(error);
			}

			retry(error as Error);
		}
	};

	return promiseRetry(retryable, opts);
}