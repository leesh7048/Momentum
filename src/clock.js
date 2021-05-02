const clockContainer = document.querySelector(".clockContainer");
const clock = document.querySelector(".clock");
const hourHand = document.querySelector(`.hour-hand`);
const minHand = document.querySelector(`.min-hand`);
const secondHand = document.querySelector(`.second-hand`);

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clock.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;

  const secondDegree = seconds * 6 + 90;
  secondHand.style.transform = `rotate(${secondDegree}deg)`;
  const minDegree = minutes * 6 + seconds * (6 / 60) + 90;
  minHand.style.transform = `rotate(${minDegree}deg)`;
  const hourDegree = hours * 30 + minutes * (30 / 60) + 90;
  hourHand.style.transform = `rotate(${hourDegree}deg)`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
