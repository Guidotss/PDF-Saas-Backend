import { hash, compare } from "bcrypt";

export class Bcrypt {
  static hash = async (password: string, salt: number): Promise<string> => {
    return await hash(password, salt);
  };

  static compare = async (password: string, hash: string): Promise<boolean> => {
    return await compare(password, hash);
  };
}
