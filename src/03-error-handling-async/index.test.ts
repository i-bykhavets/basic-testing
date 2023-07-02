import {
  throwError,
  resolveValue,
  throwCustomError,
  rejectCustomError,
  MyAwesomeError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const providedValue = 'TEST';
    return resolveValue(providedValue).then((data) => {
      expect(data).toBe(providedValue);
    });
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const providedErrorMessage = 'My provided error message';
    expect(() => throwError(providedErrorMessage)).toThrow(
      providedErrorMessage,
    );
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMessage = /^Oops!$/;
    expect(() => throwError()).toThrow(defaultMessage);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    return expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
