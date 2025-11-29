export class FrequencyValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FrequencyValidationError";
  }
}
