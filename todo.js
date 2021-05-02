const pending = document.querySelector(".pending_items");
const finished = document.querySelector(".finished_items");
const todoForm = document.querySelector(".todo_form");
const inputToDo = document.querySelector(".input_todo");
let pendingList, finishedList;
function getTextObj(text) {
  return {
    id: String(Date.now()),
    text,
  };
}
function savePending(text) {
  pendingList.push(text);
}

function removePending(textId) {
  pendingList = pendingList.filter((text) => {
    return text.id !== textId;
  });
}
function removeFinished(textId) {
  finishedList = finishedList.filter((text) => {
    return text.id !== textId;
  });
}

function findInPending(textId) {
  return pendingList.find((text) => {
    return text.id === textId;
  });
}
function findInFinished(textId) {
  return finishedList.find((text) => {
    return text.id === textId;
  });
}

function addFinished(text) {
  finishedList.push(text);
}
function addPending(text) {
  pendingList.push(text);
}

function delText(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  removeFinished(li.id);
  removePending(li.id);
  save();
}

function handleFinishClick(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  const text = findInPending(li.id);
  removePending(li.id);
  addFinished(text);
  paintFinished(text);
  save();
}

function handleBackClick(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  const text = findInFinished(li.id);
  removeFinished(li.id);
  addPending(text);
  paintPending(text);
  save();
}

function buildLi(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  span.innerText = text.text;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", delText);
  li.append(span, delBtn);
  li.id = text.id;
  return li;
}

function paintFinished(text) {
  const paintLi = buildLi(text);
  const backBtn = document.createElement("button");
  backBtn.innerText = "🔙";
  backBtn.addEventListener("click", handleBackClick);
  paintLi.append(backBtn);
  finished.append(paintLi);
}

function paintPending(text) {
  const paintLi = buildLi(text);
  const nextBtn = document.createElement("button");
  nextBtn.innerText = "✅";
  nextBtn.addEventListener("click", handleFinishClick);
  paintLi.append(nextBtn);
  pending.append(paintLi);
}

function save() {
  localStorage.setItem("pending", JSON.stringify(pendingList));
  localStorage.setItem("finished", JSON.stringify(finishedList));
}
function load() {
  pendingList = JSON.parse(localStorage.getItem("pending")) || [];
  finishedList = JSON.parse(localStorage.getItem("finished")) || [];
}

function restore() {
  pendingList.forEach((text) => {
    paintPending(text);
  });
  finishedList.forEach((text) => {
    paintFinished(text);
  });
}

function handleSubmit(e) {
  e.preventDefault();
  if (inputToDo.value === "") {
    return alert("할일을 입력해주세요 제발!!!!!!!!!!!");
  }
  textObj = getTextObj(inputToDo.value);
  inputToDo.value = "";
  paintPending(textObj);
  savePending(textObj);
  save();
}

function init() {
  todoForm.addEventListener("submit", handleSubmit);
  load();
  restore();
}

init();
