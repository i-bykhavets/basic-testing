import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 22, b: 13, action: Action.Add })).toBe(35);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 22, b: 23, action: Action.Subtract })).toBe(
      -1,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 22, b: 10, action: Action.Multiply })).toBe(
      220,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 22, b: 10, action: Action.Divide })).toBe(2.2);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 10, action: Action.Exponentiate })).toBe(
      1024,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 10, action: '+-' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 2, b: '10', action: Action.Add })).toBeNull();
  });
});
