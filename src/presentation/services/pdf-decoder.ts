import parse from "pdf-parse";
export class PdfDecoder {
  async decodeBase64AndExtractText({
    pdfBuffer,
  }: {
    pdfBuffer: Buffer;
  }): Promise<string> {
    console.log("Decoding pdf...");
    console.log(pdfBuffer); 
    return parse(pdfBuffer).then((data) => data.text);
  }
}
