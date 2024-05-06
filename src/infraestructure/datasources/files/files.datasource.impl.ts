import { FilesDataSource } from "../../../domain";

export class FilesDataSourceImpl implements FilesDataSource {
    constructor(){}
    uploadFile(file: File): Promise<string> {
        throw new Error("Method not implemented.");
    }
}