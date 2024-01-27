import { LoginDto } from "../../dtos/auth/login.dto";
import { RegisterDto } from "../../dtos/auth/register.dto";

export abstract class AuthRepository {
  abstract login(): Promise<LoginDto>;
  abstract register(): Promise<RegisterDto>;
}
