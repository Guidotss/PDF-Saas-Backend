import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { AuthRepository } from "../../domain/repositories/auth/auth.repository";
import { RegisterDto } from "../../domain/dtos/auth/register.dto";
import { LoginDto } from "../../domain/dtos/auth/login.dto";
import { Login } from "../../domain/use-cases/auth/login";
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

  public register = async (request: Request, response: Response) => {
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
      const user = await this.authRepository.register(registerDto!);
      return response
        .header("Content-Type", "application/json")
        .status(201)
        .json({
          ok: true,
          message: "User created",
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
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
            .then(data => {
                response.header("Content-Type", "application/json")
                .status(200)
                .json(data); 
            })
            .catch(error => this.handlerError(error, response));
    } catch (error) {
      this.handlerError(error, response);
    }
  };
}
