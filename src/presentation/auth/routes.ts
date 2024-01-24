import { Router } from "express";

export class AuthRoutes {
  static get router() {
    const routes = Router();
    routes.get("/login", (req, res) => {
      res.send("Login");
    });
    routes.get("/register", (req, res) => {
      res.send("Register");
    });
    return routes;
  }
}
