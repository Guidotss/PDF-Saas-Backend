import fs from "fs";
import path from "path";
import { Response, Request } from "express";
import { CustomError, FilesRepository, UploadFileDto, UploadFilesUseCase } from "../../domain";
export class FilesController {
  constructor(private readonly fileRepository: FilesRepository) {
    this.fileRepository = fileRepository;
  }
  private handleError = (error: unknown, response: Response) => {
    if (error instanceof CustomError) {
      return response
        .header("Content-Type", "application/json")
        .status(error.statusCode)
        .json({
          ok: false,
          message: error.message,
        });
    }

    console.error(error);
    return response
      .header("Content-Type", "application/json")
      .status(500)
      .json({
        ok: false,
        message: "Internal server error",
      });
  };

  public getHealth = (_: Request, res: Response) => {
    return res.status(200).json({
      ok: true,
      message: "Files service is up and running",
    });
  };

  public uploadPdf = (req: Request, res: Response) => {
    try {
      const [error, uploadFileDto] = UploadFileDto.fromRequest(req.body);

      if(error) {
        return res.status(400).json({
          ok: false,
          message: error,
        });
      }

      new UploadFilesUseCase(this.fileRepository)
        .execute(uploadFileDto!)
        .then((response) => {
          return res.status(200).json(response);
        })
        .catch((error) => {
          return this.handleError(error, res);
        });


    } catch (error) {
      return this.handleError(error, res);
    }
  };
}
