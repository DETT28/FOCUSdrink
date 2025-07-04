const timer = document.getElementById("timer");
const timeBar = document.getElementById("timeBar");
const about = document.getElementById("aboutText");

/* editable variables */
/* they're in seconds */
var workTime = 1500; // 25 minutes
var breakTime = 300; // 5 minutes
var longBreakTime = 1800; // 30 minutes

/* booleans */
// working = false will mean that the timer is filling bar
let working = true;
let aboutVisible = true;
let paused = null;
let running = null;
let workCycle = 0;

function showAbout() {
    aboutVisible = !aboutVisible;
    about.style.opacity = aboutVisible ? "1" : "0";
}

function startStop() {
    // If the timer is not running, start
    if (!running) {
        handleTimeBar();
        handleTimer();
        running = true;
        paused = false;
    // If the timer is running, pause the timer
    } else if (!paused) {
        animation.pause();
        paused = true;
        timeBar.classList.add("idle");
    // If the timer is paused, resume the timer
    } else {
        animation.play();
        paused = false;
        timeBar.classList.remove("idle");
    }
}

/* time logic */
function getTime() {
    if (working) {
        return workTime;
    } else if (workCycle >= 4) {
        return longBreakTime;
    } else {
        return breakTime;
    }
}
function handleTimer() {
    let time = getTime();
    let timerInterval = setInterval(() => {
        if (time > 0 && !paused) {
            time--;
            var minutes = Math.floor(time / 60);
            var seconds = time % 60;
            var formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            timer.textContent = formattedTime;
        } else if (time <= 0) {
            clearInterval(timerInterval);
            working = !working;
            initialize();
        }
    }, 1000);
}

function handleTimeBar() {
    // to let me dynamically insert values into time bar animation
    let keyframes, timeBarState, time;
    if (working) {
        keyframes = [
            { width: '250px'},
            { width: '0px' }
        ];
        timeBarState = "drinking";
    } else {
        keyframes = [
            { width: '0px'},
            { width: '250px' }
        ];
        timeBarState = "filling";
    }

    timeBar.classList.add(timeBarState);
    animation = timeBar.animate(keyframes, {
        duration: getTime() * 1000,
        fill: 'forwards',
    });
    animation.onfinish = () => {
        timeBar.classList.remove(timeBarState);
        running = null;
        paused = null;
    };
}

/* theme switching functions */
function darcticTheme() {
    document.body.className = "darctic";
}

function princessTheme() {
    document.body.className = "princess";
}

function mechaTheme() {
    document.body.className = "mecha";
}

function swedeTheme() {
    document.body.className = "swede";
}

function sailmoonTheme() {
    document.body.className = "sailmoon";
}

function initialize() {
    let time = getTime();
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;
    var formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timer.textContent = formattedTime;
}
