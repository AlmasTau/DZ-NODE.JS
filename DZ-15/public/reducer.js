import { types } from "./actions.js";

const initialState = {
  count: 0,
  items: []
};

function increment(state) {
  return { ...state, count: state.count + 1 };
}

function decrement(state) {
  return { ...state, count: state.count - 1 };
}

function clear(state) {
  return { ...state, count: 0 };
}

function addItem(state, action) {
  const newItem = { id: state.count, text: action.text };
  return {
    ...state,
    count: state.count + 1,
    items: [...state.items, newItem]
  };
}

function removeItem(state, action) {
  const updatedItems = state.items.filter(item => item.id !== action.id);
  return { ...state, items: updatedItems };
}

function moveItem(state, action, direction) {
  const { items } = state;
  const index = items.findIndex(item => item.id === action.id);
  const newIndex = index + direction;

  if (newIndex < 0 || newIndex >= items.length) {
    return state;
  }

  const movedItem = items[index];
  const updatedItems = [...items];
  updatedItems.splice(index, 1);
  updatedItems.splice(newIndex, 0, movedItem);

  return { ...state, items: updatedItems };
}

export function countReducer(state = initialState, action) {
  console.log("countReducer()", action);

  switch (action.type) {
    case types.INCREMENT:
      return increment(state);
    case types.DECREMENT:
      return decrement(state);
    case types.CLEAR:
      return clear(state);
    case types.ADD_ITEM:
      return addItem(state, action);
    case types.REMOVE_ITEM:
      return removeItem(state, action);
    case types.MOVE_ITEM_UP:
      return moveItem(state, action, -1);
    case types.MOVE_ITEM_DOWN:
      return moveItem(state, action, 1);
    default:
      return state;
  }
}
