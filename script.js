// script.js
let startTime, updatedTime, difference, timerInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById('display');
const laps = document.getElementById('laps');

document.getElementById('start').addEventListener('click', () => {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    timerInterval = setInterval(updateTime, 1000);
    running = true;
  }
});

document.getElementById('pause').addEventListener('click', () => {
  if (running) {
    clearInterval(timerInterval);
    difference = new Date().getTime() - startTime;
    running = false;
  }
});

document.getElementById('reset').addEventListener('click', () => {
  clearInterval(timerInterval);
  display.textContent = "00:00:00";
  laps.innerHTML = '';
  difference = 0;
  lapCounter = 1;
  running = false;
});

document.getElementById('lap').addEventListener('click', () => {
  if (running) {
    const li = document.createElement('li');
    li.textContent = `Lap ${lapCounter++}: ${display.textContent}`;
    laps.appendChild(li);
  }
});

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((difference / (1000 * 60)) % 60);
  let seconds = Math.floor((difference / 1000) % 60);

  display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
  return number < 10 ? '0' + number : number;
}