import * as fs from "fs";
import atob from "atob";

export class PdfDecoder {
  async decodeBase64AndExtractText({
    pdfBase64,
  }: {
    pdfBase64: string;
  }): Promise<string> {
    
    // Load the pdfjs library
    const pdfjs = await import("pdfjs-dist"); 
      
      // Decode the base64 string
    const pdfData: string = atob(pdfBase64);
    const pdfArray = new Uint8Array(Buffer.from(pdfData, "binary"));

    // Load the PDF
    const pdf = await pdfjs.getDocument(pdfArray).promise;
    let text = "";

    // Extract the text from each page
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const pageContent = await page.getTextContent();
      pageContent.items.forEach((item: any) => {
        text += item.str;
      });
    }
    return text;
  }
}
