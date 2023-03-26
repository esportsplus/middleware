import { Middleware, Next } from "./types";


function error(): never {
    throw new Error('Middleware: middleware did not return a value');
}

function next<I, R>(i: number, middleware: Middleware<I, R>[]): Next<I, R> {
    return (input) => middleware[i](
        input,
        ++i < middleware.length ? next(i, middleware) : error
    );
}


export default <I, R>(...middleware: Middleware<I, R>[]) => {
    if (!middleware.length) {
        throw new Error('Middleware: middleware have not been defined');
    }

    return next(0, middleware);
};
export { Middleware, Next };