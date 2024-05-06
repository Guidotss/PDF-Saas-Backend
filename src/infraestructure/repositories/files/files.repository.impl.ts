import { FilesDataSource, FilesRepository } from "../../../domain";

export class FilesRepositoryImpl implements FilesRepository {
  constructor(private readonly filesDataSource: FilesDataSource) {}
  uploadFile(buffer: Buffer): Promise<string> {
    return this.filesDataSource.uploadFile(buffer);
  }
}
