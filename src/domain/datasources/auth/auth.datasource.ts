import { LoginDto } from "../../dtos/auth/login.dto";
import { RegisterDto } from "../../dtos/auth/register.dto";
import { AuthEntity } from "../../entities/auth/auth.entity";

export abstract class AuthDataSource {
  abstract login(userData: LoginDto): Promise<AuthEntity>;
  abstract register(userData: RegisterDto): Promise<AuthEntity>;
}
