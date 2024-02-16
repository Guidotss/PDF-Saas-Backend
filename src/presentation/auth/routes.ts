import { Router } from "express";
import { AuthDataSourceImpl } from "../../infraestructure/datasources/auth/auth.datasource.impl";
import { AuthRespositoryImpl } from "../../infraestructure/repositories/auth/auth.repository.impl";
import { AuthController } from "./controller";

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
