export class HttpError extends Error {
    info: any
    status: Number
    constructor(message: string, info: any, status: Number) {
        super(message)
        this.info = info
        this.status = status
    }
}