export abstract class FilesRepository {
  abstract uploadFile(buffer: Buffer): Promise<string>;
}