import fs from "fs";
import path from "path";
import { Response, Request } from "express";
import { PdfDecoder } from "../../presentation/services/pdf-decoder";
import { CustomError } from "../../domain";
export class FilesController {
  constructor(private readonly pdfDecoder: PdfDecoder) {}
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

  public uploadPdf = async (req: Request, res: Response) => {
    try {
      const buffer = req.body;
      if (!buffer) {
        throw new CustomError("Missing base64 field", 400);
      }
      const text = await this.pdfDecoder.decodeBase64AndExtractText({
        pdfBuffer: buffer,
      });
      fs.writeFileSync(path.join("uploads/", "file.pdf"), buffer);

      return res.status(200).json({
        ok: true,
        message: "File uploaded successfully",
        text,
      });
    } catch (error) {
      return this.handleError(error, res);
    }
  };
}
