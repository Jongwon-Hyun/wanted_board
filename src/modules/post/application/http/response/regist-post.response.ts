export class RegistPostResponse {
    constructor(
        private readonly id: number,
        private readonly title: string,
        private readonly writer: string,
    ) {}
}