import { Outcome, makeSuccess, makeError, isSuccess, isError } from './index';

describe('Result', () => {
  test.each([
    { name: 'number', value: 1, expected: 1 },
    { name: 'array', value: [1, 2, 3], expected: [1, 2, 3] },
    { name: 'null', value: null, expected: null },
  ])('makeSuccess creates a success result with $name', ({ value, expected }) => {
    const result = makeSuccess(value);
    expect(result.type).toBe('success');
    expect(result.isSuccess).toBe(true);
    if (result.isSuccess) {
      expect(result.value).toEqual(expected);
    }
  });

  test.each([
    { name: 'string', value: 'Oh no', expected: 'Oh no' },
    { name: 'error', value: new Error('Broken'), expected: new Error('Broken') },
    { name: 'object', value: { errorCode: 1 }, expected: { errorCode: 1 } },
  ])('makeError creates an error result with $name', ({ value, expected }) => {
    const result = makeError(value);
    expect(result.type).toBe('error');
    expect(result.isSuccess).toBe(false);
    if (!result.isSuccess) {
      expect(result.error).toEqual(expected);
    }
  });

  test('isSuccess type guard works', () => {
    const successResult: Outcome<number> = makeSuccess(1);
    const errorResult: Outcome<number, string> = makeError('Error');

    expect(isSuccess(successResult)).toBe(true);
    expect(isSuccess(errorResult)).toBe(false);
  });

  test('isError type guard works', () => {
    const successResult: Outcome<number> = makeSuccess(1);
    const errorResult: Outcome<number, string> = makeError('Error');

    expect(isError(successResult)).toBe(false);
    expect(isError(errorResult)).toBe(true);
  });
});
