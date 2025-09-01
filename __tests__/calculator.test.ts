import {
    add,
    subtract,
    multiply,
    divide,
    validateNumber,
    validateOperation,
    createResult,
    CalculatorError,
} from '../src/lib/calculator';

describe('Calculator Unit Tests', () => {
    test('add two positive numbers', () => {
        expect(add(5, 3)).toBe(8);
    });

    test('subtract two positive numbers', () => {
        expect(subtract(10, 4)).toBe(6);
    });

    test('multiply two positive numbers', () => {
        expect(multiply(6, 7)).toBe(42);
    });

    test('divide two positive numbers', () => {
        expect(divide(15, 3)).toBe(5);
    });

    test('validateNumber with valid input', () => {
        expect(validateNumber(5, 'test')).toBe(5);
        expect(validateNumber('10', 'test')).toBe(10);
    });

    test('validateOperation with valid inputs', () => {
        const result = validateOperation(5, 3);
        expect(result).toEqual({ a: 5, b: 3 });
    });

    test('addition with zero', () => {
        expect(add(5, 0)).toBe(5);
        expect(add(0, 3)).toBe(3);
    });

    test('multiplication by one', () => {
        expect(multiply(8, 1)).toBe(8);
        expect(multiply(1, -5)).toBe(-5);
    });

    test('decimal number operations', () => {
        expect(add(1.5, 2.3)).toBeCloseTo(3.8);
        expect(multiply(0.5, 0.4)).toBeCloseTo(0.2);
    });

    test('createResult function', () => {
        const inputs = { a: 5, b: 3 };
        const result = createResult(8, 'addition', inputs);
        expect(result).toEqual({
            result: 8,
            operation: 'addition',
            inputs: { a: 5, b: 3 }
        });
    });

    test('validateNumber throws error for invalid string', () => {
        expect(() => validateNumber('abc', 'test')).toThrow('test must be a valid number');
    });

    test('validateNumber throws error for null input', () => {
        expect(() => validateNumber(null, 'test')).toThrow('test is required');
    });

    test('validateNumber throws error for undefined input', () => {
        expect(() => validateNumber(undefined, 'test')).toThrow('test is required');
    });

    test('validateNumber throws error for infinite value', () => {
        expect(() => validateNumber(Infinity, 'test')).toThrow('test must be a finite number');
    });

    test('validateOperation throws error for invalid first parameter', () => {
        expect(() => validateOperation('abc', 5)).toThrow('a must be a valid number');
    });

    test('validateOperation throws error for invalid second parameter', () => {
        expect(() => validateOperation(5, 'xyz')).toThrow('b must be a valid number');
    });

    test('division by zero throws error', () => {
        expect(() => divide(5, 0)).toThrow('Division by zero is not allowed');
    });

    test('addition with very large numbers throws error', () => {
        expect(() => add(Number.MAX_VALUE, Number.MAX_VALUE)).toThrow('Addition resulted in infinite value');
    });

    test('subtraction resulting in infinite value throws error', () => {
        expect(() => subtract(Number.MAX_VALUE, -Number.MAX_VALUE)).toThrow('Subtraction resulted in infinite value');
    });

    test('multiplication resulting in infinite value throws error', () => {
        expect(() => multiply(Number.MAX_VALUE, 2)).toThrow('Multiplication resulted in infinite value');
    });
});
