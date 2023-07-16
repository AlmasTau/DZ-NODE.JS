import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(question) {
  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

function writeToFile(filename, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function main() {
  try {
    const firstName = await prompt('Введите имя: ');
    const lastName = await prompt('Введите фамилию: ');
    const birthdate = await prompt('Введите дату рождения: ');
    const filename = await prompt('Введите имя файла для сохранения: ');

    const data = `Имя: ${firstName}\nФамилия: ${lastName}\nДата рождения: ${birthdate}`;

    await writeToFile(filename, data);

    console.log('Информация успешно записана в файл', filename);
  } catch (err) {
    console.error('Ошибка:', err);
  } finally {
    rl.close();
  }
}

main();
