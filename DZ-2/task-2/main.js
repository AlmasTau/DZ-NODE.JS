import { prompt } from "./prompt.js";

const log = console.log;

async function getUserInput() {
  let userAge = await prompt("Сколько вам лет? ", 5);
  log("Ваш возраст:", userAge);

  let userWeight = await prompt("Какой у вас вес? ", 0.0);
  log("Ваш вес:", userWeight);

  let userName = await prompt("Как вас зовут? ", "no name");
  log("Вас зовут:", userName);
}

getUserInput();
