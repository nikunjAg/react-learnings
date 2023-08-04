import React, { useEffect, useState } from 'react';

const SECONDS = 1000;
const MINUTES = 60 * SECONDS;
const HOURS = 60 * MINUTES;
const DAYS = 24 * HOURS;

const getDHMS = (time) => {
    const days = Math.floor(time / DAYS);
    const hours = Math.floor((time % DAYS) / HOURS);
    const minutes = Math.floor((time % HOURS) / MINUTES);
    const seconds = Math.floor((time % MINUTES) / SECONDS);

    return {
        days, hours, minutes, seconds
    };
}


const Timer = ({duration, onFinish}) => {
	
	const [currentTime, setCurrentTime] = useState(duration);
	
	useEffect(() => {
	
		if (currentTime <= 0) {
			onFinish();
			return;
		}
	
		const id = setTimeout(() => {
			setCurrentTime(prev => prev > 1000 ? prev - 1000 : 0);
		}, 1000);
		
		return () => {
			clearTimeout(id);
		}
	}, [onFinish, currentTime]);
	

    const { days, hours, minutes, seconds } = getDHMS(currentTime);

	return <h1>
        {days} Days : {hours} Hours : {minutes} Minutes : {seconds} Seconds
    </h1>;
	
};

export default Timer;