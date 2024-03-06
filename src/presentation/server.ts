import express, { Router, json, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
import compression from "compression";

interface ServerOptions {
  port: number;
  routes: Router;
}

export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: ServerOptions) {
    this.port = options.port;
    this.routes = options.routes;
  }

  async start() {
    // Middlewares
    this.app.use(morgan("dev"));
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
      })
    );
    this.app.use(express.json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
      })
    );
    this.app.use(compression());
    this.app.use(this.routes);

    // Start server
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}🚀`);
    });
  }
}
