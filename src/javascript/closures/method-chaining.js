export const computeAmount = () => {
    
    let total = 0;
    const obj = {
        crore(val = 0) {
            total += val * 10000000;
            return this;
        },
        lacs(val = 0) {
            total += val * 100000;
            return this;
        },
        thousand(val = 0) {
            total += val * 1000;
            return this;
        },
        hundred(val = 0) {
            total += val * 100;
            return this;
        },
        ten(val = 0) {
            total += val * 10;
            return this;
        },
        one(val = 0) {
            total += val * 1;
            return this;
        },
        value() {
            return total;
        }
    };

    return obj;
}