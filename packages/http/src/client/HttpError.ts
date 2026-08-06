export class HttpError<T = unknown> extends Error {
  readonly ok = false;

  constructor(
    public readonly data: T,
    public readonly status?: number,
    public readonly headers?: Headers,
  ) {
    super();
  }
}
