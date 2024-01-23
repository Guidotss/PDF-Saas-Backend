import express, { Router, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";

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
    this.app.use(morgan("dev"));
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
      })
    );
    this.app.use(express.json());
    this.app.use(urlencoded({ extended: false }));
    this.app.use(this.routes);
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}🚀`);
    });
  }
}
