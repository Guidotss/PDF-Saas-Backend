import parse from "pdf-parse";
export class PdfDecoder {
  async decodeBase64AndExtractText({
    pdfBuffer,
  }: {
    pdfBuffer: Buffer;
  }): Promise<string> {
    return parse(pdfBuffer).then((data) => data.text);
  }
}
