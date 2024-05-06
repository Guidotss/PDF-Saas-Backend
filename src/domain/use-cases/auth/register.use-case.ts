import { AuthRepository, CustomError, RegisterDto } from "../..";
import { JwtAdapter, envs } from "../../../config";
import { CustomAuthReponse, SignToken } from "../../types";

interface IRegisterUseCase {
  execute: (userData: RegisterDto) => Promise<CustomAuthReponse>;
}
export class RegisterUseCase implements IRegisterUseCase {
  private readonly jsonSecret = envs.jwtSecret;
  constructor(
    private readonly AuthRepository: AuthRepository,
    protected readonly signToken: SignToken = JwtAdapter.sign
  ) {}
  async execute(userData: RegisterDto): Promise<CustomAuthReponse> {
    const user = await this.AuthRepository.register(userData);
    const token = await this.signToken(
      { userId: user.id },
      this.jsonSecret,
      "1h"
    );

    if (!token) throw new CustomError("Internal Server Error", 500);

    return {
      ok: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
