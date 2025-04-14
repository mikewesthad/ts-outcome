type DefaultErrorType = Error;

export type OutcomeSuccess<SuccessType> = { type: 'success'; isSuccess: true; value: SuccessType };
export type OutcomeError<ErrorType> = { type: 'error'; isSuccess: false; error: ErrorType };

/**
 * An Outcome type representing either a successful value or an error.
 */
export type Outcome<SuccessType, ErrorType = DefaultErrorType> =
  | OutcomeSuccess<SuccessType>
  | OutcomeError<ErrorType>;

/**
 * Creates a successful Outcome.
 */
export function makeSuccess<SuccessType, ErrorType = DefaultErrorType>(
  value: SuccessType
): Outcome<SuccessType, ErrorType> {
  return { type: 'success', isSuccess: true, value };
}

/**
 * Creates an error Outcome.
 */
export function makeError<SuccessType, ErrorType = DefaultErrorType>(
  error: ErrorType
): Outcome<SuccessType, ErrorType> {
  return { type: 'error', isSuccess: false, error };
}

/**
 * Checks if an Outcome is successful.
 */
export function isSuccess<SuccessType, ErrorType = DefaultErrorType>(
  result: Outcome<SuccessType, ErrorType>
): result is OutcomeSuccess<SuccessType> {
  return result.type === 'success';
}

/**
 * Checks if an Outcome is an error.
 */
export function isError<SuccessType, ErrorType = DefaultErrorType>(
  result: Outcome<SuccessType, ErrorType>
): result is OutcomeError<ErrorType> {
  return result.type === 'error';
}
