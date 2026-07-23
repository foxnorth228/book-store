export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly data?: unknown,
    message?: string,
  ) {
    super(message ?? "HTTP request failed");

    this.name = "HttpError";
  }
}
