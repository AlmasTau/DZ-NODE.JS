import readline from 'readline';

export function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    rl.question(question + ' ', (input) => {
      resolve(input);
      rl.close();
    });

    rl.on('error', (err) => {
      reject(err);
    });
  });
}
