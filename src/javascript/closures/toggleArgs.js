export const toggleArgs = (...args) => {
    let idx = -1;

    function next() {
        idx = (idx + 1) % args.length;
    }

    return function () {
        next();
        return args[idx];
    }
};


export const sampler = (fn, iteration = 1) => {
    let count = 0;
    return function (...args) {
        if (++count % iteration === 0) {
            return fn(...args);
        }
    }
}
