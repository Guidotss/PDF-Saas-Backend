import { Bcrypt } from "../../../config";
import { prisma } from "../../../data/mongo";
import {
  AuthDataSource,
  AuthEntity,
  CustomError,
  LoginDto,
  RegisterDto,
} from "../../../domain";

type CompareFunction = (password: string, hash: string) => Promise<boolean>;
type HashFunction = (password: string, salt: number) => Promise<string>;
export class AuthDataSourceImpl implements AuthDataSource {
  constructor(
    private readonly compare: CompareFunction = Bcrypt.compare,
    private readonly hash: HashFunction = Bcrypt.hash
  ) {}

  private hashPassword(password: string): Promise<string> {
    return this.hash(password, 10);
  }

  private comparePassword(password: string, hash: string): Promise<boolean> {
    return this.compare(password, hash);
  }

  private async getUserByEmail(email: string): Promise<AuthEntity | null> {
    try {
      if (!email) throw new CustomError("Email is required", 400);
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) return null;

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

  async getUserById(id: string): Promise<AuthEntity> {
    try {
      console.log(id); 
      const checkUser = await prisma.user.findUnique({ where: { id } });
      if (!checkUser) throw new CustomError("User not found", 404);

      return AuthEntity.fromObject(checkUser);
    } catch (error) {
      console.log(error);
      throw new CustomError("Error getting user by id", 500);
    }
  }
}
