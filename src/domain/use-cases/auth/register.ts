import { AuthRepository, CustomError, RegisterDto } from "../..";
import { JwtAdapter } from "../../../config";

type UserToken = {
  ok: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

interface RegisterUseCase {
  execute: (userData: RegisterDto) => Promise<UserToken>;
}

type SignToken = (payload: object, expiresIn: string) => Promise<string | null>;

export class Register implements RegisterUseCase {
  constructor(
    private readonly AuthRepository: AuthRepository,
    protected readonly signToken: SignToken = JwtAdapter.sign
  ) {}
  async execute(userData: RegisterDto): Promise<UserToken> {
    const user = await this.AuthRepository.register(userData);
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
