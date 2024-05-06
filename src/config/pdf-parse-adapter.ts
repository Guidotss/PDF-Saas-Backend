import parse from "pdf-parse";
export class PdfParseAdapter {
  static async parse({ pdfBuffer }: { pdfBuffer: Buffer }): Promise<string> {
    return parse(pdfBuffer).then((data) => data.text);
  }
}
