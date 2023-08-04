function Timers() {
    const timerIds = [];
    return {
        setTimeout: (fn, timeout) => {
            const timerId = window.setTimeout(fn, timeout);
            timerIds.push(timerId);
        },
        clearAllTimeouts: () => {
            while(timerIds.length > 0) {
                window.clearTimeout(timerIds.pop());
            }
        }
    };
};

export const init = () => {
    console.log("HERE");
    const timer = Timers();
    
    timer.setTimeout(() => {
        console.log("1");
    }, 1000);
    
    timer.setTimeout(() => {
        console.log("2");
        timer.clearAllTimeouts();
    }, 2000);
    
    timer.setTimeout(() => {
        console.log("3");
    }, 3000);
    
    timer.setTimeout(() => {
        console.log("4");
    }, 4000);
}