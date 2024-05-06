import { FilesRepository, UploadFileDto } from "../../";

interface CustomResponse {
  ok: boolean;
  message: string;
  text: string;
}

interface IUploadFilesUseCase {
  execute(uploadFileDto: UploadFileDto): Promise<CustomResponse>;
}

export class UploadFilesUseCase implements IUploadFilesUseCase {
  constructor(private readonly fileRepository: FilesRepository) {}
  async execute({ buffer }: UploadFileDto): Promise<CustomResponse> {
    const url = await this.fileRepository.uploadFile(buffer);
    return {
      ok: true,
      message: "File uploaded successfully",
      text: url,
    };
  }
}
