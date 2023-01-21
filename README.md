# just-retry-it

A simple `async/await` wrapper around [promise-retry](https://www.npmjs.com/package/promise-retry) and [retry](https://www.npmjs.com/package/retry).

Why?
- Simplify the interface. You don't need to write the `try-catch-retry` part yourself.
- Accept an optional error handler function that will be called after each failed attempt.

Kudos to [promise-retry](https://www.npmjs.com/package/promise-retry) and [retry](https://www.npmjs.com/package/retry) authors 🙏.

## Installation

```
$ npm install just-retry-it
```

## Usage
```
await retry(operation, errorHandler, options?)
```
- `operation`: The operation to be executed and retried if the execution should fail.
- `errorHandler`: The error handler function, called right after the `operation` if the latter throws. Will receive the thrown error as the input. In case the error handler is not provided (left `undefined`) this argument is ignored.
- `options`: The options object as it is desrcibed in the [retry](https://www.npmjs.com/package/retry) NPM package.

## Example

```javascript
import retry from 'just-retry-it';

async function getMessage() {
    if (Math.random() > 0.5) {
        return "Hello World!";
    }

    throw new Error("boom");
}

async function run() {
    // Retry without the error handler.
    const msg1 = await retry(getMessage, { retries: 5 });
    
    async function errorHandler(error) {
        console.log("received an error", error);
    }
    
    // Retry with the error handler.
    const msg2 = await retry(getMessage, { retries: 5, errorHandler });
}
```

## License

[MIT](./LICENSE)