import { Request, Response } from "express";
import {
  AuthRepository,
  CustomError,
  Login,
  LoginDto,
  RegisterDto,
  Register,
} from "../../domain";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  private handlerError(error: unknown, response: Response) {
    if (error instanceof CustomError) {
      return response
        .header("Content-Type", "application/json")
        .status(error.statusCode)
        .json({
          ok: false,
          message: error.message,
        });
    }
  }

  public register = (request: Request, response: Response) => {
    const [error, registerDto] = RegisterDto.register(request.body);
    if (error) {
      return response
        .header("Content-Type", "application/json")
        .status(400)
        .json({
          ok: false,
          message: error,
        });
    }
    try {
      new Register(this.authRepository)
        .execute(registerDto!)
        .then((data) => {
          response
            .header("Content-Type", "application/json")
            .status(201)
            .json(data);
        })
        .catch((error) => this.handlerError(error, response));
    } catch (error) {
      this.handlerError(error, response);
    }
  };

  public login = (request: Request, response: Response) => {
    const [error, loginDto] = LoginDto.login(request.body);
    if (error) {
      return response
        .header("Content-Type", "application/json")
        .status(400)
        .json({
          ok: false,
          message: error,
        });
    }

    try {
      new Login(this.authRepository)
        .execute(loginDto!)
        .then((data) => {
          response
            .header("Content-Type", "application/json")
            .status(200)
            .json(data);
        })
        .catch((error) => this.handlerError(error, response));
    } catch (error) {
      this.handlerError(error, response);
    }
  };
}
