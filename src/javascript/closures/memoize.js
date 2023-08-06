// Works only for pure functions
export default function memoize(fn) {

    const cache = {};

    return function(...args) {

        const argsStr = JSON.stringify(args);
        if (!(argsStr in cache)) {
            console.log('Calculating...');
            const res = fn.call(this, ...args);
            cache[argsStr] = res;
        }

        return cache[argsStr];
    }
}