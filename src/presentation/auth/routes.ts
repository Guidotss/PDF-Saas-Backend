import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDataSourceImpl, AuthRespositoryImpl } from "../../infraestructure";

export class AuthRoutes {
  static get router() {
    const routes = Router();
    const datasource = new AuthDataSourceImpl();
    const repository = new AuthRespositoryImpl(datasource);
    const controller = new AuthController(repository);

    routes.post("/login", controller.login);
    routes.post("/register", controller.register);

    return routes;
  }
}
