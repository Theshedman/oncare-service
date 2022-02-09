export class GenericError extends Error {
  constructor(readonly message: string, readonly code: number) {
    super(message);
  }
}
