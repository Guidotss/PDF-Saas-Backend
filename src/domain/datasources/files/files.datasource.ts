export abstract class FilesDataSource {
  abstract uploadFile(file: File): Promise<string>;
}