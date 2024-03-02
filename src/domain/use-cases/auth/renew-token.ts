import { JwtAdapter } from "../../../config";
import { CustomError, AuthRepository, RenewTokenDto } from "../../";

interface UserToken {
  ok: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface RenewToken {
  execute: (token: RenewTokenDto) => Promise<UserToken>;
}

type SignToken = (payload: object, expiresIn: string) => Promise<string | null>;
type VerifyToken = (token: string) => Promise<string | null>;

export class RenewTokenUseCase implements RenewToken {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.sign,
    private readonly verifyToken: VerifyToken = JwtAdapter.verify
  ) {}

  async execute({ token }: RenewTokenDto): Promise<UserToken> {
    const { userId } = (await this.verifyToken(token)) as unknown as {
      userId: string;
    };

    if (!userId) throw new CustomError("Unauthorized", 401);

    const user = await this.authRepository.getUserById(userId);

    const newToken = await this.signToken({ userId }, "2h");

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
