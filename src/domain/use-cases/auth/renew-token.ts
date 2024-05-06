import { JwtAdapter, envs } from "../../../config";
import { CustomError, AuthRepository, RenewTokenDto } from "../../";
import {
  CustomAuthReponse,
  SignToken,
  TokenData,
  VerifyToken,
} from "../../types";

interface RenewToken {
  execute: (token: RenewTokenDto) => Promise<CustomAuthReponse>;
}
export class RenewTokenUseCase implements RenewToken {
  private readonly jsonSecret = envs.jwtSecret;
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.sign,
    private readonly verifyToken: VerifyToken = JwtAdapter.verify
  ) {}

  async execute({ token }: RenewTokenDto): Promise<CustomAuthReponse> {
    const { userId } = await this.verifyToken<TokenData>(
      token,
      this.jsonSecret
    );

    if (!userId) throw new CustomError("Unauthorized", 401);

    const user = await this.authRepository.getUserById(userId);

    const newToken = await this.signToken({ userId }, this.jsonSecret, "1h");

    if (!newToken) throw new CustomError("Internal Server Error", 500);

    return {
      ok: true,
      token: newToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
