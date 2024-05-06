import { FilesDataSource, FilesRepository } from "../../../domain";

export class FilesRepositoryImpl implements FilesRepository {
  constructor(private readonly filesDataSource: FilesDataSource) {}
  uploadFile(file: File): Promise<string> {
    return this.filesDataSource.uploadFile(file);
  }
}
