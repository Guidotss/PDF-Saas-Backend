import { Router } from "express";
import { FilesController } from "./controllers";
import {
  FilesDataSourceImpl,
  FilesRepositoryImpl,
} from "../../infraestructure";

export class FileRoutes {
  static get router() {
    const routes = Router();
    const filesDatasource = new FilesDataSourceImpl();
    const filesRepository = new FilesRepositoryImpl(filesDatasource);

    const controller = new FilesController(filesRepository);

    routes.post("/upload", controller.uploadPdf);

    return routes;
  }
}
