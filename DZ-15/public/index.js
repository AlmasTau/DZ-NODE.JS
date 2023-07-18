import * as actions from './actions.js';
import { dispatcher } from './dispatcher.js';
import { countView, listView } from './view.js';
import { store } from './store.js';

console.log(actions.types);

function handleButtonClick(action) {
  return () => {
    dispatcher.dispatch(action());
  };
}

function handleFormSubmit(event) {
  event.preventDefault();
  const text = itemInput.value.trim();
  if (text !== "") {
    dispatcher.dispatch(actions.addItem(text));
    itemInput.value = "";
  }
}

function handleListItemAction(event) {
  const target = event.target;
  const id = parseInt(target.parentNode.getAttribute("data-id"));

  if (target.classList.contains("remove-button")) {
    dispatcher.dispatch(actions.removeItem(id));
  } else if (target.classList.contains("up-button")) {
    dispatcher.dispatch(actions.moveItemUp(id));
  } else if (target.classList.contains("down-button")) {
    dispatcher.dispatch(actions.moveItemDown(id));
  }
}

const incrementButton = document.getElementById("incr");
const decrementButton = document.getElementById("decr");
const clearButton = document.getElementById("clear");
const addButton = document.getElementById("add-button");
const addForm = document.getElementById("add-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

incrementButton.addEventListener("click", handleButtonClick(actions.increment));
decrementButton.addEventListener("click", handleButtonClick(actions.decrement));
clearButton.addEventListener("click", handleButtonClick(actions.clear));
addForm.addEventListener("submit", handleFormSubmit);
itemList.addEventListener("click", handleListItemAction);

let counter = new countView(store);
let list = new listView(store);
