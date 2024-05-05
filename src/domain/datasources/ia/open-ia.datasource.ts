export abstract class OpenIaDataSource {
  abstract sendMessage(message: string): Promise<string>;
}