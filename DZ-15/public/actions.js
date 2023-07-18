export const types = {
    INCREMENT: "INCREMENT",
    DECREMENT: "DECREMENT",
    CLEAR: "CLEAR",
    ADD_ITEM: "ADD_ITEM",
    REMOVE_ITEM: "REMOVE_ITEM",
    MOVE_ITEM_UP: "MOVE_ITEM_UP",
    MOVE_ITEM_DOWN: "MOVE_ITEM_DOWN"
}

export function increment() {
    return {
        type: types.INCREMENT
    };
}

export function decrement() {
    return {
        type: types.DECREMENT
    };
}

export function clear() {
    return {
        type: types.CLEAR
    };
}

export function addItem(text) {
    return {
        type: types.ADD_ITEM,
        text
    };
}

export function removeItem(id) {
    return {
        type: types.REMOVE_ITEM,
        id
    };
}

export function moveItemUp(id) {
    return {
        type: types.MOVE_ITEM_UP,
        id
    };
}

export function moveItemDown(id) {
    return {
        type: types.MOVE_ITEM_DOWN,
        id
    };
}