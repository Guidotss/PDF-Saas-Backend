import { Router } from "express";
import { FilesController } from "./controllers";
import { PdfDecoder } from "../../presentation/services/pdf-decoder";

export class FileRoutes {
  static get router() {
    const routes = Router();
    const pdfDecoder = new PdfDecoder();
    const controller = new FilesController(pdfDecoder);
    
    routes.post("/upload", controller.uploadPdf);

    return routes;
  }
}
