import { Response, Request } from "express";
import { PdfDecoder } from "../../infraestructure";

export class FilesController {
  constructor(
    private readonly pdfDecoder: PdfDecoder,  
  ) {
    this.pdfDecoder = pdfDecoder; 
  }

  public getHealth = (_: Request, res: Response) => {
    return res.status(200).json({
      ok: true,
      message: "Files service is up and running",
    });
  };
}
