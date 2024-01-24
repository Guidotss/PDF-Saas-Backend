import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {
  static get routes() {
    const router = Router();

    router.use("/auth", AuthRoutes.router);
    return router;
  }
}
