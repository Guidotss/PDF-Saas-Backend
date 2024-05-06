export abstract class FilesDataSource {
  abstract uploadFile(buffer: Buffer): Promise<string>;
}
