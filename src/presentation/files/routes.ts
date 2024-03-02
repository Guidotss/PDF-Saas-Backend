import { Router } from "express";
import { FilesController } from "./controllers";
import { PdfDecoder } from "../../infraestructure";

export class FileRoutes {
  static get router() {
    const routes = Router();
    const pdfDecoder = new PdfDecoder();

    const controller = new FilesController(pdfDecoder);

    routes.get("/health", controller.getHealth);

    return routes;
  }
}
