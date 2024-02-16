import bcrypt from "bcrypt";
import { prisma } from "../../../data/mongo";
import { AuthDataSource } from "../../../domain/datasources/auth/auth.datasource";
import { LoginDto } from "../../../domain/dtos/auth/login.dto";
import { RegisterDto } from "../../../domain/dtos/auth/register.dto";
import { AuthEntity } from "../../../domain/entities/auth/auth.entity";
import { CustomError } from "../../../domain/errors/custom.error";

export class AuthDataSourceImpl implements AuthDataSource {
  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  private async getUserByEmail(email: string): Promise<AuthEntity> {
    try {
      if (!email) throw new CustomError("Email is required", 400);
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) throw new CustomError("User not found", 404);

      return AuthEntity.fromObject(user);
    } catch (error) {
      console.log(error);
      throw new CustomError("Error getting user by email", 500);
    }
  }

  async login(userData: LoginDto): Promise<AuthEntity> {
    try {
      const user = await this.getUserByEmail(userData.email);
      if (!user) throw new CustomError("User not found", 404);
      const isValidPassword = this.comparePassword(
        userData.password,
        user.password
      );
      if (!isValidPassword) throw new CustomError("Invalid password", 400);

      return AuthEntity.fromObject(user);
    } catch (error) {
      console.log(error);
      throw new CustomError("Error getting user by email", 500);
    }
  }
  async register(userData: RegisterDto): Promise<AuthEntity> {
    try {
      const checkUser = await this.getUserByEmail(userData.email);
      if (checkUser) throw new CustomError("User already exists", 400);

      const hashedPassword = await this.hashPassword(userData.password);
      const user = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
        },
      });

      return AuthEntity.fromObject(user);
    } catch (error) {
      console.log(error);
      throw new CustomError("Error registering user", 500);
    }
  }
}
