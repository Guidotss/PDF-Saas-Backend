import { AuthEntity, LoginDto, RegisterDto } from "../..";


export abstract class AuthRepository {
  abstract  getUserById(id: string): Promise<AuthEntity>;
  abstract login(userData: LoginDto): Promise<AuthEntity>;
  abstract register(userData: RegisterDto): Promise<AuthEntity>;
}
