import { prompt } from './prompt.js';

// Пример использования №1
prompt("Сколько вам лет?")
.then((userInput) => {
const userAge = Number(userInput);
log("Ваш возраст:", userAge);
})
.catch((error) => {
console.error("Ошибка:", error);
});

// Пример использования №2
// (async () => {
// try {
// const userInput = await prompt("Сколько вам лет?");
// const userAge = Number(userInput);
// log("Ваш возраст:", userAge);
// } catch (error) {
// console.error("Ошибка:", error);
// }
// })();