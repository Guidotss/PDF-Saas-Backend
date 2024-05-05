export abstract class IaRepository {
  abstract sendMessage(message: string): Promise<string>;
}