import { FilesRepository } from "../../";

interface CustomResponse {
  ok: boolean;
  message: string;
}

interface IUploadFilesUseCase {
  exceute(files: any): Promise<CustomResponse>;
}

export class UploadFilesUseCase implements IUploadFilesUseCase {
  constructor(private readonly fileRepository: FilesRepository) {}
  exceute(files: any): Promise<CustomResponse> {
    throw new Error("Method not implemented.");
  }
}
