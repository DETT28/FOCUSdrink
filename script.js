/* these are the constants for the elements I made in html */
const documentBody = document.getElementById ('documentBody');
const FocusIntroTop = document.getElementById ('FOCUSdrink');
const InspoCreditBott = document.getElementById ('creditStatement');
const showAboutButton = document.getElementById ('showAboutButton');
const centerContent = document.getElementById ('centerContent');
const mainHeader = document.getElementById ('mainHeader');
const focusTime = document.getElementById ('focusTime');
const timeBar = document.getElementById ('timeBar');
const startStopButton = document.getElementById ('startStop');
const resetTimerButton = document.getElementById ('resetButton');
const skipAheadButton = document.getElementById ('skipAheadButton');
const cycleBreakReminder = document.getElementById ('cycleBreakReminder');
const cycleBreakStatus = document.getElementById ('cycleBreakStatus');
const themeCondition = document.getElementById ('themeCondition');

/* these are the dynamic values */
let longBreakInput = 1799; /* 30 minutes decremented by 1 */
let longBreakLeft = longBreakInput;
let timeInput = 1499; /* 25 minutes decremented by 1 */
let timeLeft = timeInput;
let fillInput = 399; /* 5 minutes decremented by 1 */
let fillLeft = fillInput;
let timer = null;
let filler = null;
let pausedTime = null;
let timeBarDrinkDuration = timeLeft;
let timeBarFillDuration = fillLeft;
let aboutTextVisible = true;
let fillStatus = false;
let cycleCount = 1;

let timerActive = false;

let darcticActive = true;
let princessActive = false;
let mechaActive = false;
let swedeActive = false;

/* this is for the about and credit text outside of the box */
function showCreditText() {
    if (!aboutTextVisible) {
        FocusIntroTop.classList.remove('outsideDisappear');
        InspoCreditBott.classList.remove('outsideDisappear');
        aboutTextVisible = true;
    } else {
        FocusIntroTop.classList.add('outsideDisappear');
        InspoCreditBott.classList.add('outsideDisappear');
        aboutTextVisible = false;
    }
}

/* this function is to show a reminder and suggest a 30 minute break */
function cycleRemind() {
    if (cycleCount === 5) {
        cycleBreakReminder.classList.add('appearReminder');
    } else {
        cycleBreakReminder.classList.remove('appearReminder');
    }
}

/* this function is connected to a button in html which
determines whether the button should start or pause the timer */
function startStop() {
    if (!timer) {
        startTimer();
    } else {
        pauseTimer();
    }
}

const facts = [one]

/* this is what starts the timer. It decides whether it should
focus or fill */
function startTimer() {
    if (timeLeft != 0) {
        timeBar.style.animation = `timeBarDrink ${timeLeft}s 1.5s`;
        timer = setInterval(updateTimer, 1000);
        timeBar.classList.add('running');
        timeBarTheme();
        timeBar.classList.remove('filling');
        timeBar.classList.remove('reset');
        timeBar.classList.remove('runDone');
        timeBar.classList.remove('fillDone');
        startStopButton.textContent = "P A U S E";
        FocusIntroTop.classList.add('outsideDisappear');
        InspoCreditBott.classList.add('outsideDisappear');
        aboutTextVisible = false;
        fillStatus = false;
        skipAheadButton.classList.add('inFunctional');
    } else if (cycleCount !== 5) {
        timeBar.style.animation = `timeBarFill ${fillLeft}s 1.5s`;
        timer = setInterval(updateFiller, 1000);
        timeBar.classList.add('filling');
        timeBarTheme();
        timeBar.classList.remove('running');
        timeBar.classList.remove('reset');
        timeBar.classList.remove('fillDone');
        startStopButton.textContent = "P A U S E";
        FocusIntroTop.classList.add('outsideDisappear');
        InspoCreditBott.classList.add('outsideDisappear');
        aboutTextVisible = false;
        fillStatus = true;
    } else if (cycleCount === 5) {
        cycleBreakReminder.classList.remove('appearReminder');
        cycleBreakStatus.classList.add('appearStatus');
        cycleCount = 1;
        timeBar.style.animation = `timeBarFill ${longBreakLeft}s 1.5s`;
        timer = setInterval(updateLongBreak, 1000);
        timeBar.classList.add('filling');
        timeBar.classList.remove('running');
        timeBar.classList.remove('reset');
        timeBar.classList.remove('fillDone');
        startStopButton.textContent = "P A U S E";
        FocusIntroTop.classList.add('outsideDisappear');
        InspoCreditBott.classList.add('outsideDisappear');
        aboutTextVisible = false;
        fillStatus = false;
    }
}

/* This is what pauses the timer, and it self-determines whether it
should pause focus timer or filler timer */
function pauseTimer() {
    if (timeLeft != 0) {
        clearInterval(timer);
        timer = null;
        pausedTime = timeLeft;
        timeBar.style.animationPlayState = 'paused';
        timeBar.classList.remove('running');
        timeBar.classList.remove('filling');
        startStopButton.textContent = "F O C U S";
    } else {
        clearInterval(timer);
        timer = null;
        pausedTime = fillLeft;
        timeBar.style.animationPlayState = 'paused';
        timeBar.classList.remove('filling');
        timeBar.classList.remove('running');
        startStopButton.textContent = "R E F I L L";
    }
}

/* This is what actually runs the timer. Specifically the focus timer */
function updateTimer() {
    if (timeLeft <= 0) {
        cycleCount++;
        if (cycleCount === 5) {
            cycleRemind();
            skipAheadButton.classList.remove('inFunctional');
            focusStatus = false;
            timeBar.classList.add('runDone');
            startStopButton.textContent = "R E F I L L";
            clearInterval(timer);
            timer = null;
            focusTime.innerHTML = "30:00";
            return;
        } else {
            cycleRemind();
            skipAheadButton.classList.remove('inFunctional');
            focusStatus = false;
            timeBar.classList.add('runDone');
            startStopButton.textContent = "R E F I L L";
            clearInterval(timer);
            timer = null;
            focusTime.innerHTML = "05:00";
            return;
        }
    }

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    focusTime.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    timeLeft--;
}

/* This is for the filler, similar to the updateTimer function above */
function updateFiller() {
    if (fillLeft <= 0) {
        fillStatus = false;
        resetCycle();
        startStopButton.textContent = "F O C U S";
        clearInterval(filler);
        filler = fillLeft;
        focusTime.innerHTML = "25:00";
        return;
    }

    const fillMinutes = Math.floor(fillLeft / 60);
    const fillSeconds = fillLeft % 60;

    focusTime.innerHTML = `${String(fillMinutes).padStart(2, '0')}:${String(fillSeconds).padStart(2, '0')}`;
    fillLeft--;
}

/* this is for the 30 minute long break */
function updateLongBreak() {
    if (longBreakLeft <= 0) {
        cycleBreakStatus.classList.remove('appearStatus');
        cycleCount = 1;
        fillStatus = false;
        resetCycle();
        startStopButton.textContent = "F O C U S";
        clearInterval(filler);
        filler = fillLeft;
        focusTime.innerHTML = "25:00";
        return;
    }

    const longBreakMinutes = Math.floor(longBreakLeft / 60);
    const longBreakSeconds = longBreakLeft % 60;

    focusTime.innerHTML = `${String(longBreakMinutes).padStart(2, '0')}:${String(longBreakSeconds).padStart(2, '0')}`;
    longBreakLeft--;
}

/* This is connected to a button in the html file that resets
the timer back down to complete zero, like you just opened
the program */
function resetTimer() {
    clearInterval(timer);
    clearInterval(filler);
    focusTime.innerHTML = "25:00";
    startStopButton.textContent = "F O C U S";
    timeBar.classList.remove('running', 'filling', 'runDone', 'fillDone');
    timeBar.style.animation = 'timeBarReset 100ms';
    timeBar.classList.add('reset');
    timeLeft = timeInput;
    fillLeft = fillInput;
    skipAheadButton.classList.add('inFunctional');
    cycleCount = 1;
}

/* This function is for the button to the right of the timer. Only
functions with filling timer. This skips the break to go to the working
time instantly */
function skipAhead() {
    if (fillStatus = true) {
        cycleBreakReminder.classList.remove('appearReminder');
        cycleBreakStatus.classList.remove('appearStatus');
        resetTimer();
    }
}

/* This is very similar to the restTimer function, but it's for a cycle.
It's like after a 25 minute run and a 5 minute break, it resets. This
is to make sure the timer can run indefinitely, whether it be three or
three-hundred times */
function resetCycle() {
    clearInterval(timer);
    clearInterval(filler);
    focusTime.innerHTML = "25:00";
    startStopButton.textContent = "F O C U S";
    timeBar.classList.remove('running', 'filling', 'runDone', 'fillDone');
    timeLeft = timeInput;
    fillLeft = fillInput;
    startStop();
    skipAheadButton.classList.remove('inFunctional');
}

/* THEMES AREA */

function timeBarTheme() {
    timeBar.classList.remove('darcticTheme');
    timeBar.classList.remove('princessTheme');
    timeBar.classList.remove('mechaTheme');
    timeBar.classList.remove('swedeTheme');
}

function activateDarctic() {
    darcticActive = true;
    princessActive = false;
    mechaActive = false;
    swedeActive = false;

    documentBody.classList.add('darcticTheme');
    FocusIntroTop.classList.add('darcticTheme');
    InspoCreditBott.classList.add('darcticTheme');
    documentBody.classList.add('darcticTheme');
    showAboutButton.classList.add('darcticTheme');
    centerContent.classList.add('darcticTheme');
    mainHeader.classList.add('darcticTheme');
    focusTime.classList.add('darcticTheme');
    timeBar.classList.add ('darcticTheme');
    startStopButton.classList.add('darcticTheme');
    resetTimerButton.classList.add('darcticTheme');
    skipAheadButton.classList.add('darcticTheme');
    cycleBreakReminder.classList.add('darcticTheme');
    cycleBreakStatus.classList.add('darcticTheme');

    documentBody.classList.remove('princessTheme');
    FocusIntroTop.classList.remove('princessTheme');
    InspoCreditBott.classList.remove('princessTheme');
    documentBody.classList.remove('princessTheme');
    showAboutButton.classList.remove('princessTheme');
    centerContent.classList.remove('princessTheme');
    mainHeader.classList.remove('princessTheme');
    focusTime.classList.remove('princessTheme');
    timeBar.classList.remove('princessTheme');
    startStopButton.classList.remove('princessTheme');
    resetTimerButton.classList.remove('princessTheme');
    skipAheadButton.classList.remove('princessTheme');
    cycleBreakReminder.classList.remove('princessTheme');
    cycleBreakStatus.classList.remove('princessTheme');

    documentBody.classList.remove('mechaTheme');
    FocusIntroTop.classList.remove('mechaTheme');
    InspoCreditBott.classList.remove('mechaTheme');
    documentBody.classList.remove('mechaTheme');
    showAboutButton.classList.remove('mechaTheme');
    centerContent.classList.remove('mechaTheme');
    mainHeader.classList.remove('mechaTheme');
    focusTime.classList.remove('mechaTheme');
    timeBar.classList.remove('mechaTheme');
    startStopButton.classList.remove('mechaTheme');
    resetTimerButton.classList.remove('mechaTheme');
    skipAheadButton.classList.remove('mechaTheme');
    cycleBreakReminder.classList.remove('mechaTheme');
    cycleBreakStatus.classList.remove('mechaTheme');

    documentBody.classList.remove('swedeTheme');
    FocusIntroTop.classList.remove('swedeTheme');
    InspoCreditBott.classList.remove('swedeTheme');
    documentBody.classList.remove('swedeTheme');
    showAboutButton.classList.remove('swedeTheme');
    centerContent.classList.remove('swedeTheme');
    mainHeader.classList.remove('swedeTheme');
    focusTime.classList.remove('swedeTheme');
    timeBar.classList.remove('swedeTheme');
    startStopButton.classList.remove('swedeTheme');
    resetTimerButton.classList.remove('swedeTheme');
    skipAheadButton.classList.remove('swedeTheme');
    cycleBreakReminder.classList.remove('swedeTheme');
    cycleBreakStatus.classList.remove('swedeTheme');
}

function activatePrincess() {
    darcticActive = false;
    princessActive = true;
    mechaActive = false;
    swedeActive = false;

    documentBody.classList.add('princessTheme');
    FocusIntroTop.classList.add('princessTheme');
    InspoCreditBott.classList.add('princessTheme');
    documentBody.classList.add('princessTheme');
    showAboutButton.classList.add('princessTheme');
    centerContent.classList.add('princessTheme');
    mainHeader.classList.add('princessTheme');
    focusTime.classList.add('princessTheme');
    timeBar.classList.add('princessTheme');
    startStopButton.classList.add('princessTheme');
    resetTimerButton.classList.add('princessTheme');
    skipAheadButton.classList.add('princessTheme');
    cycleBreakReminder.classList.add('princessTheme');
    cycleBreakStatus.classList.add('princessTheme');

    documentBody.classList.remove('darcticTheme');
    FocusIntroTop.classList.remove('darcticTheme');
    InspoCreditBott.classList.remove('darcticTheme');
    documentBody.classList.remove('darcticTheme');
    showAboutButton.classList.remove('darcticTheme');
    centerContent.classList.remove('darcticTheme');
    mainHeader.classList.remove('darcticTheme');
    focusTime.classList.remove('darcticTheme');
    timeBar.classList.remove('darcticTheme');
    startStopButton.classList.remove('darcticTheme');
    resetTimerButton.classList.remove('darcticTheme');
    skipAheadButton.classList.remove('darcticTheme');
    cycleBreakReminder.classList.remove('darcticTheme');
    cycleBreakStatus.classList.remove('darcticTheme');

    documentBody.classList.remove('mechaTheme');
    FocusIntroTop.classList.remove('mechaTheme');
    InspoCreditBott.classList.remove('mechaTheme');
    documentBody.classList.remove('mechaTheme');
    showAboutButton.classList.remove('mechaTheme');
    centerContent.classList.remove('mechaTheme');
    mainHeader.classList.remove('mechaTheme');
    focusTime.classList.remove('mechaTheme');
    timeBar.classList.remove('mechaTheme');
    startStopButton.classList.remove('mechaTheme');
    resetTimerButton.classList.remove('mechaTheme');
    skipAheadButton.classList.remove('mechaTheme');
    cycleBreakReminder.classList.remove('mechaTheme');
    cycleBreakStatus.classList.remove('mechaTheme');

    documentBody.classList.remove('swedeTheme');
    FocusIntroTop.classList.remove('swedeTheme');
    InspoCreditBott.classList.remove('swedeTheme');
    documentBody.classList.remove('swedeTheme');
    showAboutButton.classList.remove('swedeTheme');
    centerContent.classList.remove('swedeTheme');
    mainHeader.classList.remove('swedeTheme');
    focusTime.classList.remove('swedeTheme');
    timeBar.classList.remove('swedeTheme');
    startStopButton.classList.remove('swedeTheme');
    resetTimerButton.classList.remove('swedeTheme');
    skipAheadButton.classList.remove('swedeTheme');
    cycleBreakReminder.classList.remove('swedeTheme');
    cycleBreakStatus.classList.remove('swedeTheme');
}

function activateMecha() {
    darcticActive = false;
    princessActive = false;
    mechaActive = true;
    swedeActive = false;

    documentBody.classList.add('mechaTheme');
    FocusIntroTop.classList.add('mechaTheme');
    InspoCreditBott.classList.add('mechaTheme');
    documentBody.classList.add('mechaTheme');
    showAboutButton.classList.add('mechaTheme');
    centerContent.classList.add('mechaTheme');
    mainHeader.classList.add('mechaTheme');
    focusTime.classList.add('mechaTheme');
    timeBar.classList.add('mechaTheme');
    startStopButton.classList.add('mechaTheme');
    resetTimerButton.classList.add('mechaTheme');
    skipAheadButton.classList.add('mechaTheme');
    cycleBreakReminder.classList.add('mechaTheme');
    cycleBreakStatus.classList.add('mechaTheme');

    documentBody.classList.remove('swedeTheme');
    FocusIntroTop.classList.remove('swedeTheme');
    InspoCreditBott.classList.remove('swedeTheme');
    documentBody.classList.remove('swedeTheme');
    showAboutButton.classList.remove('swedeTheme');
    centerContent.classList.remove('swedeTheme');
    mainHeader.classList.remove('swedeTheme');
    focusTime.classList.remove('swedeTheme');
    timeBar.classList.remove('swedeTheme');
    startStopButton.classList.remove('swedeTheme');
    resetTimerButton.classList.remove('swedeTheme');
    skipAheadButton.classList.remove('swedeTheme');
    cycleBreakReminder.classList.remove('swedeTheme');
    cycleBreakStatus.classList.remove('swedeTheme');

    documentBody.classList.remove('darcticTheme');
    FocusIntroTop.classList.remove('darcticTheme');
    InspoCreditBott.classList.remove('darcticTheme');
    documentBody.classList.remove('darcticTheme');
    showAboutButton.classList.remove('darcticTheme');
    centerContent.classList.remove('darcticTheme');
    mainHeader.classList.remove('darcticTheme');
    focusTime.classList.remove('darcticTheme');
    timeBar.classList.remove('darcticTheme');
    startStopButton.classList.remove('darcticTheme');
    resetTimerButton.classList.remove('darcticTheme');
    skipAheadButton.classList.remove('darcticTheme');
    cycleBreakReminder.classList.remove('darcticTheme');
    cycleBreakStatus.classList.remove('darcticTheme');

    documentBody.classList.remove('princessTheme');
    FocusIntroTop.classList.remove('princessTheme');
    InspoCreditBott.classList.remove('princessTheme');
    documentBody.classList.remove('princessTheme');
    showAboutButton.classList.remove('princessTheme');
    centerContent.classList.remove('princessTheme');
    mainHeader.classList.remove('princessTheme');
    focusTime.classList.remove('princessTheme');
    timeBar.classList.remove('princessTheme');
    startStopButton.classList.remove('princessTheme');
    resetTimerButton.classList.remove('princessTheme');
    skipAheadButton.classList.remove('princessTheme');
    cycleBreakReminder.classList.remove('princessTheme');
    cycleBreakStatus.classList.remove('princessTheme');
}

function activateSwede() {
    darcticActive = false;
    princessActive = false;
    mechaActive = false;
    swedeActive = true;

    documentBody.classList.add('swedeTheme');
    FocusIntroTop.classList.add('swedeTheme');
    InspoCreditBott.classList.add('swedeTheme');
    documentBody.classList.add('swedeTheme');
    showAboutButton.classList.add('swedeTheme');
    centerContent.classList.add('swedeTheme');
    mainHeader.classList.add('swedeTheme');
    focusTime.classList.add('swedeTheme');
    timeBar.classList.add('swedeTheme');
    startStopButton.classList.add('swedeTheme');
    resetTimerButton.classList.add('swedeTheme');
    skipAheadButton.classList.add('swedeTheme');
    cycleBreakReminder.classList.add('swedeTheme');
    cycleBreakStatus.classList.add('swedeTheme');

    documentBody.classList.remove('darcticTheme');
    FocusIntroTop.classList.remove('darcticTheme');
    InspoCreditBott.classList.remove('darcticTheme');
    documentBody.classList.remove('darcticTheme');
    showAboutButton.classList.remove('darcticTheme');
    centerContent.classList.remove('darcticTheme');
    mainHeader.classList.remove('darcticTheme');
    focusTime.classList.remove('darcticTheme');
    timeBar.classList.remove('darcticTheme');
    startStopButton.classList.remove('darcticTheme');
    resetTimerButton.classList.remove('darcticTheme');
    skipAheadButton.classList.remove('darcticTheme');
    cycleBreakReminder.classList.remove('darcticTheme');
    cycleBreakStatus.classList.remove('darcticTheme');

    documentBody.classList.remove('princessTheme');
    FocusIntroTop.classList.remove('princessTheme');
    InspoCreditBott.classList.remove('princessTheme');
    documentBody.classList.remove('princessTheme');
    showAboutButton.classList.remove('princessTheme');
    centerContent.classList.remove('princessTheme');
    mainHeader.classList.remove('princessTheme');
    focusTime.classList.remove('princessTheme');
    timeBar.classList.remove('princessTheme');
    startStopButton.classList.remove('princessTheme');
    resetTimerButton.classList.remove('princessTheme');
    skipAheadButton.classList.remove('princessTheme');
    cycleBreakReminder.classList.remove('princessTheme');
    cycleBreakStatus.classList.remove('princessTheme');

    documentBody.classList.remove('mechaTheme');
    FocusIntroTop.classList.remove('mechaTheme');
    InspoCreditBott.classList.remove('mechaTheme');
    documentBody.classList.remove('mechaTheme');
    showAboutButton.classList.remove('mechaTheme');
    centerContent.classList.remove('mechaTheme');
    mainHeader.classList.remove('mechaTheme');
    focusTime.classList.remove('mechaTheme');
    timeBar.classList.remove('mechaTheme');
    startStopButton.classList.remove('mechaTheme');
    resetTimerButton.classList.remove('mechaTheme');
    skipAheadButton.classList.remove('mechaTheme');
    cycleBreakReminder.classList.remove('mechaTheme');
    cycleBreakStatus.classList.remove('mechaTheme');
}