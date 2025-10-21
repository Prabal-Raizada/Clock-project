//Features
const timeWrapper = document.querySelector(".timeWrapper");
const stopwatchWrapper = document.querySelector(".stopwatchWrapper");
const alarmContainer = document.querySelector(".alarmContainer");

const tabs = {
    clockbtn: timeWrapper,
    stopwatchbtn: stopwatchWrapper,
    alarambtn: alarmContainer
}
const btn = document.querySelectorAll(".tab-btn")

timeWrapper.classList.contains("not-active")?clockbtn.style.backgroundColor = "#fff" : clockbtn.style.backgroundColor = "#1ff685";

function showSection(activeId){
    Object.values(tabs).forEach(section => section.classList.add("not-active"))
    tabs[activeId].classList.remove("not-active")
    btn.forEach(button => button.style.backgroundColor = "")
    document.getElementById(activeId).style.backgroundColor = "#1ff685";
}
btn.forEach(button =>{
    button.addEventListener("click", ()=>showSection(button.id))
})

//Clock

let clockWrapper = document.createElement("div")
clockWrapper.className = "clock-wrapper"
timeWrapper.appendChild(clockWrapper)

function updateClock() {
    let now = new Date()
    let date_option = { day: 'numeric', month: 'long', year: 'numeric' }
    let date_now = now.toLocaleDateString('en-GB', date_option)
    const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    let time_now = now.toLocaleTimeString('en-US', timeOptions)
    clockWrapper.innerHTML = `<div class = "date">${date_now}</div><div class="time">${time_now}</div>`
}

updateClock()
setInterval(updateClock, 1000);

//stopwatch

let stopwatchDisplay = document.querySelector(".stopwatch-display");
let startBtn = document.getElementById("startbtn");
let pauseBtn = document.getElementById("pausebtn");
let resetBtn = document.getElementById("resetbtn");

let stopWatchInterval;
let seconds = 0, minutes = 0, hours = 0;
let isRunning = false;

function formatTime(unit) {
    return unit < 10 ? `0${unit}` : unit;
}

function updateStopwatchDisplay() {
    stopwatchDisplay.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`

}

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        stopWatchInterval = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++
            }
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
            updateStopwatchDisplay();
        },1000)
    }
}
function pauseStopwatch(){
    isRunning  = false;
    clearInterval(stopWatchInterval)
}

function resetStopwatch(){
    isRunning = false;
    clearInterval(stopWatchInterval)
    hours = seconds = minutes = 0
    updateStopwatchDisplay()
}

startBtn.addEventListener("click", startStopwatch)
pauseBtn.addEventListener("click", pauseStopwatch)
resetBtn.addEventListener("click", resetStopwatch)