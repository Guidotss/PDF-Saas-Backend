import { JwtAdapter } from "../../../config/jwt-adapter";
import { LoginDto } from "../../dtos/auth/login.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth/auth.repository";

interface UserToken {
  ok: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface LoginUseCase {
  execute(userData: LoginDto): Promise<UserToken>;
}
type SignToken = (
  playload: object,
  expiresIn: string
) => Promise<string | null>;

export class Login implements LoginUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.sign
  ) {}
  async execute(userData: LoginDto): Promise<UserToken> {
    const user = await this.authRepository.login(userData);
    const token = await this.signToken({ userId: user.id }, "2h");

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
