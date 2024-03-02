export class RenewTokenDto {
  private constructor(public readonly token: string) {}

  static renewToken(props: { token: string }): [string?, RenewTokenDto?] {
    const { token } = props;

    if (!token) {
      return ["Token is required"];
    }

    return [undefined, new RenewTokenDto(token)];
  }
}
