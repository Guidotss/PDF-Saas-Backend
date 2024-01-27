export class FileDto {
    private constructor(
        public readonly name: string,
        public readonly url: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ){}
}