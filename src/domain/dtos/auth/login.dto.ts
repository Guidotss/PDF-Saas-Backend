export class LoginDto {
  private constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static login(props: {
    email: string;
    password: string;
  }): [string?, LoginDto?] {
    const { email, password } = props;
    if (!email) return ["Email is required"];
    if (!password) return ["Password is required"];
    if (password.length < 6) return ["Password must be at least 6 characters"];
    if (password.length > 20) return ["Password must be at most 20 characters"];
    return [undefined, new LoginDto(email, password)];
  }
}
