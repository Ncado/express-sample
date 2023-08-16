export class CustomError extends Error {
    constructor(message: string, public fields: Record<string, string>, public code: string) {
        super(message);
    }
}