// Sum Curry
// const curry = sumCurry()
// curry(1);
// curry(2);
// curry(3);
export const sumCurry = () => {
    let total = 0;
    return function(x) {
        total += x;
        return total;
    }
}

// Sum Curry Chain
// sumCurry(1)(2)()
export const sumCurryChain = (...args) => {

    if (args.length === 0) return 0;

    return (...newArgs) => {
        if (newArgs.length) return sumCurryChain(...args, ...newArgs);
        
        return args.reduce((total, curr) => total + curr, 0);
    }
}

// If we do not use state we have an advantage that
// we can reuse already curried function from scratch like
// const sum = (a, b, c, d) => a + b + c + d;
// const curry = curryExistingFunction(sum);
// curry(1)()(2,3)(4)
// curry(1,2)()(3)(4)

// In sumCurry we want to remember previous calls s we used common state
// In sumCurryChain we do not want to remember all call to curry we just want to remember current curry all calls
// so we use args and recursion
// Here we want create new threads on each call
// so first we return the curryFunction
// then on each curriedFn as we want seperate threads so we do not used states we used args and recursion.

export const curryExistingFunction = (fn) => {
    // const allArgs = [];
    return function inner(...args) {
        // allArgs.push(...args);

        if (args.length >= fn.length) {
            return fn.call(this, ...args);
        }

        return function(...args2) {
            return inner(...args, ...args2);
        }
        // return inner.bind(null, ...args);
    }
};