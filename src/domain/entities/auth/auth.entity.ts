export class AuthEntity {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly files: any[]
  ) {}
  public static fromObject(obj: { [key: string]: any }) {
    const { name, email, password, files } = obj;
  }
}
