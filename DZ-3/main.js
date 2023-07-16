const log = console.log;
const readline = require('readline');

class InputHandler {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  async start() {
    log('Введите команду или выражение:');
    for await (const line of this.rl) {
      const input = line.trim();

      if (input.startsWith('solve')) {
        const expression = input.slice(6).trim();
        this.solveExpression(expression);
      } else if (input === 'exit') {
        this.exit();
      } else {
        this.logInput(input);
      }
    }
  }

  solveExpression(expression) {
    try {
      const result = eval(expression);
      this.logResult(result);
    } catch {
      this.logError('Не могу вычислить');
    }
  }

  logInput(input) {
    log(input);
  }

  logResult(result) {
    log(result);
  }

  logError(message) {
    log(message);
  }

  exit() {
    this.rl.close();
    process.exit();
  }
}

const inputHandler = new InputHandler();
inputHandler.start();
