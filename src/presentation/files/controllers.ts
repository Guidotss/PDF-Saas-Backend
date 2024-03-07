import { Response, Request } from "express";
import { PdfDecoder } from "../../presentation/services/pdf-decoder";
import { CustomError } from "../../domain";

export class FilesController {
  constructor(private readonly pdfDecoder: PdfDecoder) {
    this.pdfDecoder = pdfDecoder;
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
    const file = req.body.pdf;
    if (!file) {
      return this.handleError(new CustomError("No file provided", 400), res);
    }

    console.log(file); 

    if (typeof file !== "string") {
      return this.handleError(new CustomError("Invalid file provided", 400), res);
    }
    
  };
}
