export class UploadFileDto {
  constructor(public buffer: Buffer) {}

  static fromRequest(buffer: Buffer): [string?, UploadFileDto?] {
    if (typeof buffer != "object" || !Buffer.isBuffer(buffer)) {
      return ["Buffer is required"];
    }
    if (!buffer) {
      return ["Buffer is required"];
    }
    return [undefined, new UploadFileDto(buffer)];
  }
}
