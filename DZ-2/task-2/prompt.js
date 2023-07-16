const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export function prompt(question, defaultValue) {
  return new Promise((resolve, reject) => {
    rl.question(question, (userInput) => {
      rl.close();
      resolve(userInput || defaultValue);
    });
  });
}
