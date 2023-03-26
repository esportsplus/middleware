type Middleware<I, R> = (input: I, next: Next<I, R>) => R;

type Next<I, R> = (input: I) => R;


export { Middleware, Next };