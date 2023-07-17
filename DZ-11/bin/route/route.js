import express from "express";

export class Router {
  constructor(controller, config) {
    this.controller = controller;
    this.config = config;
    this.app = express();
    this.createRoutes();
  }

  start() {
    this.server = this.app.listen(this.config.port, () => {
      console.log("Server started at", this.config.port);
    });
  }

  stop() {
    this.server.close();
  }

  createRoutes() {
    const routes = [
      { method: "get", path: "/", handler: "mainPageHandler" },
      { method: "get", path: "/register", handler: "registrationPageHandler" },
      { method: "get", path: "/login", handler: "loginPageHandler" },
      { method: "post", path: "/login", handler: "loginHandler" },
      { method: "post", path: "/confirm", handler: "confirmHandler" },
      { method: "post", path: "/confirmed", handler: "confirmedHandler" },
    ];

    routes.forEach((route) => {
      const { method, path, handler } = route;
      this.app[method](path, (req, res) => {
        if (this.controller.isSession(req, res)) {
          this.controller.mainUserPage(req, res);
        } else {
          this.controller[handler](req, res);
        }
      });
    });
  }
}
