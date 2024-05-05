export abstract class FilesRepository {
  abstract uploadFile(file: File): Promise<string>;
}