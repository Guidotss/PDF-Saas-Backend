import { AuthDataSource } from "../../../domain/datasources/auth/auth.datasource";
import { LoginDto } from "../../../domain/dtos/auth/login.dto";
import { RegisterDto } from "../../../domain/dtos/auth/register.dto";
import { AuthEntity } from "../../../domain/entities/auth/auth.entity";
import { AuthRepository } from "../../../domain/repositories/auth/auth.repository";

export class AuthRespositoryImpl implements AuthRepository {
  constructor(private readonly datasource: AuthDataSource) {
    this.datasource = datasource;
  }
  login(userData: LoginDto): Promise<AuthEntity> {
    return this.datasource.login(userData);
  }
  register(userData: RegisterDto): Promise<AuthEntity> {
    return this.datasource.register(userData);
  }
}
