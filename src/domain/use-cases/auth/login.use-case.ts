import { AuthRepository, CustomError, LoginDto } from "../..";
import { JwtAdapter, envs } from "../../../config";
import { CustomAuthReponse, SignToken } from "../../types/";

interface ILoginUseCase {
  execute(userData: LoginDto): Promise<CustomAuthReponse>;
}

export class LoginUseCase implements ILoginUseCase {
  private readonly jsonSecret = envs.jwtSecret;
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.sign
  ) {}
  async execute(userData: LoginDto): Promise<CustomAuthReponse> {
    const user = await this.authRepository.login(userData);
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
