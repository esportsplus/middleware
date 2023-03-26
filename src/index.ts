import { Middleware, Next } from "./types";


function error(): never {
    throw new Error('Middleware: middleware did not return a value');
}


export default <I, R>(...middleware: Middleware<I, R>[]) => {
    if (!middleware.length) {
        throw new Error('Middleware: middleware have not been defined');
    }

    let stack: Next<I, R>[] = [];

    for (let i = 0, n = middleware.length; i < n; i++) {
        stack[i] = (input) => middleware[i](input, stack[i + 1] || error);
    }

    return ((input) => stack[0](input)) as Next<I, R>;
};
export { Middleware, Next };