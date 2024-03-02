import { AuthDataSource, AuthEntity, AuthRepository, LoginDto, RegisterDto } from "../../../domain";


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

  getUserById(id: string): Promise<AuthEntity> {
    return this.datasource.getUserById(id);
  }
}
