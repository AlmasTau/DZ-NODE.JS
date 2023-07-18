export class ListView {
    constructor(store) {
      this.store = store;
      this.itemList = document.getElementById("item-list");
      this.itemList.addEventListener("click", this.handleItemClick);
      this.render();
    }
  
    handleItemClick = (event) => {
      if (event.target.classList.contains("remove-button")) {
        const itemId = event.target.parentElement.getAttribute("data-id");
        this.store.dispatch({ type: "REMOVE_ITEM", payload: itemId });
      } else if (event.target.classList.contains("up-button")) {
        const itemId = event.target.parentElement.getAttribute("data-id");
        this.store.dispatch({ type: "MOVE_UP_ITEM", payload: itemId });
      } else if (event.target.classList.contains("down-button")) {
        const itemId = event.target.parentElement.getAttribute("data-id");
        this.store.dispatch({ type: "MOVE_DOWN_ITEM", payload: itemId });
      }
    };
  
    render = () => {
      const items = this.store.getState().items;
      this.itemList.innerHTML = "";
      items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.text;
        li.setAttribute("data-id", item.id);
  
        const removeButton = document.createElement("button");
        removeButton.textContent = "X";
        removeButton.className = "remove-button";
  
        const upButton = document.createElement("button");
        upButton.textContent = "Вверх";
        upButton.className = "up-button";
  
        const downButton = document.createElement("button");
        downButton.textContent = "Вниз";
        downButton.className = "down-button";
  
        li.appendChild(removeButton);
        li.appendChild(upButton);
        li.appendChild(downButton);
        this.itemList.appendChild(li);
      });
    };
  }
  
  export class CountView {
    constructor(store) {
      this.store = store;
      this.countElement = document.querySelector(".number");
      this.render();
    }
  
    render = () => {
      const count = this.store.getState().count;
      this.countElement.textContent = count.toString();
    };
  }
  