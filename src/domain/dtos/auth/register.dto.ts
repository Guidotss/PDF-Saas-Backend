export class RegisterDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}
  static register(props: {
    name: string;
    password: string;
    email: string;
  }): [string?, RegisterDto?] {
    const { name, email, password } = props;

    if (!name) {
      return ["Name is required"];
    }
    if (!email) {
      return ["Email is required"];
    }
    if (!password) {
      return ["Password is required"];
    }

    if (password.length < 6) {
      return ["Password must be at least 6 characters"];
    }

    if (password.length > 20) {
      return ["Password must be at most 20 characters"];
    }

    return [undefined, new RegisterDto(name, email, password)];
  }
}
