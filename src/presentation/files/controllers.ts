import { Response, Request, raw } from "express";
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
    const buffer = req.body;
    console.log(buffer);

    let text = "";
    this.pdfDecoder
      .decodeBase64AndExtractText({ pdfBase64: buffer.toString() })
      .then((data) => {
        text = data;
      })
      .catch((error) => this.handleError(error, res));
    console.log(text);
  };
}
