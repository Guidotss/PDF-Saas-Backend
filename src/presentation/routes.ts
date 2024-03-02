import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { FileRoutes } from "./files/routes";

export class AppRoutes {
  static get routes() {
    const router = Router();

    router.use("/auth", AuthRoutes.router);
    router.use('/files', FileRoutes.router);
    return router;
  }
}
