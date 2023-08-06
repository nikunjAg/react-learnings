import { useEffect, useState } from 'react';

const getDHMS = (time) => {

	const SECONDS = 1000;
	const MINUTES = 60 * SECONDS;
	const HOURS = 60 * MINUTES;
	const DAYS = 24 * HOURS;

    const days = Math.floor(time / DAYS);
    const hours = Math.floor((time % DAYS) / HOURS);
    const minutes = Math.floor((time % HOURS) / MINUTES);
    const seconds = Math.floor((time % MINUTES) / SECONDS);

    return {
        days,
        hours,
        minutes,
        seconds,
    };
};

const TimerState = {
	Running: 'RUNNING',
	Paused: 'PAUSED',
	Stopped: 'STOPPED',
};

const Timer = ({ duration, onFinish }) => {
    const [currentTime, setCurrentTime] = useState(duration);
	const [timerState, setTimerState] = useState(TimerState.Running);

    useEffect(() => {

		if (timerState !== TimerState.Running) return;

        if (currentTime <= 0) {
            onFinish();
            return;
        }

        const id = setTimeout(() => {
            setCurrentTime((prev) => (prev > 1000 ? prev - 1000 : 0));
        }, 1000);

        return () => {
            clearTimeout(id);
        };
    }, [onFinish, currentTime, timerState]);

	const pauseResumeHandler = () => {
		if (timerState === TimerState.Running) {
			setTimerState(TimerState.Paused);
		} else if (timerState === TimerState.Paused){
			setTimerState(TimerState.Running);
		}
	}

	
	const restartHandler = () => {
		setTimerState(TimerState.Running);
		setCurrentTime(duration);
	}

	const startStopHandler = () => {
		if (timerState === TimerState.Stopped) {
			restartHandler();
		} else {
			setTimerState(TimerState.Stopped);
		}
		
	}

    const { days, hours, minutes, seconds } = getDHMS(currentTime);

    return (
        <>
            <h1>
                {days} Days : {hours} Hours : {minutes} Minutes : {seconds} Seconds
            </h1>
			<div>
				{
					timerState !== TimerState.Stopped &&
					<button
						disabled={timerState === TimerState.Stopped}
						onClick={pauseResumeHandler}
					>
						{timerState === TimerState.Running ? "Pause" : "Resume"}
					</button>
				}
				<button onClick={startStopHandler} >{timerState === TimerState.Stopped ? 'Start' : 'Stop'}</button>
				{
					timerState !== TimerState.Stopped &&
					<button onClick={restartHandler} >Restart</button>
				}
			</div>
        </>
    );
};

export default Timer;
