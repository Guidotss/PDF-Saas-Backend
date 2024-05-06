import { PdfParseAdapter } from "../../../config";
import { FilesDataSource } from "../../../domain";
import { Parse } from "../../../domain/types";

export class FilesDataSourceImpl implements FilesDataSource {
  constructor(private readonly pdfParse: Parse = PdfParseAdapter.parse) {}
  async uploadFile(buffer: Buffer): Promise<string> {
    return await this.pdfParse({ pdfBuffer: buffer });
  }
}
