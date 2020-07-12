class CustomError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

class AssertionError extends CustomError {
  constructor(message: string) {
    super(`Assertion error: ${message}`);
  }
}

export function assert(
  condition: boolean,
  message?: string
): asserts condition {
  if (!condition) {
    throw new AssertionError(message || 'assertion failure');
  }
}
