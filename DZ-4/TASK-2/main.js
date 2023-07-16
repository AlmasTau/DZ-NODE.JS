import fs from 'fs';
const log = console.log;

const readFileAsync = (path, options) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, options, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const writeFileAsync = (path, data, options) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, options, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const filePath = './data.json';

(async () => {
  try {
    const data = await readFileAsync(filePath, 'utf8');
    const json = JSON.parse(data);

    log('Текущее значение count:', json.count);

    json.count++;

    await writeFileAsync(filePath, JSON.stringify(json), 'utf8');

    log('JSON успешно обновлен');
  } catch (err) {
    console.error('Ошибка:', err);
  }
})();
