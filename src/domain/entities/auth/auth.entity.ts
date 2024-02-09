export class AuthEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}
  public static fromObject(obj: { [key: string]: any }) {
    const { name, email, password, id } = obj;

    if (!name || !email || !password || !id) {
      throw new Error("Missing required fields");
    }
    if (!name) {
      throw new Error("Name is required");
    }
    if (!email) {
      throw new Error("Email is required");
    }
    if (!password) {
      throw new Error("Password is required");
    }
    if (!id) {
      throw new Error("Id is required");
    }

    return new AuthEntity(id, name, email, password);
  }
}
