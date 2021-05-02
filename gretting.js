const form = document.querySelector(".form");
const inputName = document.querySelector("input");
const showName = document.querySelector(".showName");

function saveName(text) {
  localStorage.setItem("user", text);
}

function handleSubmit(e) {
  e.preventDefault();
  const currentValue = inputName.value;
  paintgretting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add("showing");
  form.addEventListener("submit", handleSubmit);
}

function paintgretting(text) {
  form.classList.remove("showing");
  showName.classList.add("showingName");
  showName.innerText = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem("user");
  if (currentUser === null) {
    askForName();
  } else {
    paintgretting(currentUser);
  }
}

function init() {
  loadName();
}

init();
