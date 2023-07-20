const boldBtn = document.getElementById('bold');
const italBtn = document.getElementById('italic');
const undlBtn = document.getElementById('underline');

const saveBtn = document.getElementById('save');
const mainArea = document.getElementById('main-area');

boldBtn.onclick = () => {
    let selected = window.getSelection().toString();
    mainArea.innerHTML = mainArea.innerHTML.replace(selected, selected.bold());
}

italBtn.onclick = () => {
    let selected = window.getSelection().toString();
    mainArea.innerHTML = mainArea.innerHTML.replace(selected, selected.italics());
}

undlBtn.onclick = () => {
    let selected = window.getSelection().toString();
    mainArea.innerHTML = mainArea.innerHTML.replace(selected, `<u>${selected}</u>`);
}

saveBtn.onclick = () => {
    window.backend.save(mainArea.innerHTML);
}
const convertToRtfBtn = document.getElementById('convertToRtf');

convertToRtfBtn.onclick = () => {
    const mainAreaContent = mainArea.innerHTML;

    window.backend.convertToRtf(mainAreaContent);
};