const express = require('express');
const bodyParser = require('body-parser');

class Router {
  constructor(controller, config) {
    this.controller = controller;
    this.config = config;
    this.app = express();
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.createRoutes();
  }

  start() {
    this.server = this.app.listen(this.config.port, () => {
      console.log('Server started at', this.config.port);
    });
  }

  stop() {
    this.server.close();
  }

  createRoutes() {
    const app = this.app;
    const controller = this.controller;

    app.get('/', controller.mainUserPage, controller.mainGeneralPage);

    app.get('/register', controller.mainUserPage, controller.registrationPage);

    app.get('/captcha.pic', controller.sendCaptcha);

    app.get('/login', controller.mainUserPage, controller.loginPage);

    app.post('/login', controller.checkLogin, controller.redirToUserPage);

    app.post('/confirm', controller.generateConfirmCode.bind(controller));

    app.post('/confirmed', controller.checkConfirmCode.bind(controller));
  }
}

module.exports = Router;
