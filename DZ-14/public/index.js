
const userName = prompt("Введите своё имя");

let socket = io();
console.log(socket);

socket.on("message", (data) => {
    let msg = document.createElement('div');
    msg.classList.add('incoming');
    msg.innerHTML = `<b>${data.from}:</b> ${data.text}`;
    document.body.append(msg);
});

document.querySelector('#input-form').onsubmit = (ev) => {
    ev.preventDefault();
    let msg = document.querySelector('#input').value;
    document.querySelector('#input').value = '';
    console.log(msg);
    if (msg) {
        socket.emit("message", {text: msg, from: userName, chatId: socket.id});
    }

}
