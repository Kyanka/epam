$(document).ready(function(){
    let interval;
    const secondsInMinutes = 60;
    const millisInSecond = 1000;
    const millisInMinute = secondsInMinutes * millisInSecond;
    const frequency = 15;
    let isRunning = false;
    let curTime = 0;

    function updateTime() {
        const $screen = $('#screen');

        const minutesNum = Math.floor(curTime / millisInMinute);
        const secondsNum = Math.floor(curTime / millisInSecond) % secondsInMinutes;
        const millisNum  = Math.floor(curTime % millisInSecond / 10);

        const minutes = format(minutesNum)
        const seconds = format(secondsNum)
        const millis = format(millisNum)

        let time = `${minutes}:${seconds}:${millis}`;

        $('#screen').text(time);

        if (minutes === 60) {
            reset();
        }
    }

    function format(number) {
        return (number < 10) ? `0${number}` : number;
    }
    
    function toggle(){
        isRunning = !isRunning;
        if (isRunning) {
            interval = setInterval(function(){
                updateTime();
                curTime += frequency;
            }, frequency)
        }
        else {
            clearInterval(interval);
        }
    }
    
    function reset(){
        if (isRunning)
            toggle();
        curTime = 0;
        updateTime();
    }
    
    updateTime();
    $('#gostop').on('click', toggle)
    $('#reset').on('click', reset)
})