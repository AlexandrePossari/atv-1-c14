export interface CalculatorOperation {
    a: number;
    b: number;
}

export interface CalculatorResult {
    result: number;
    operation: string;
    inputs: CalculatorOperation;
}

export class CalculatorError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CalculatorError';
    }
}

export function validateNumber(value: unknown, paramName: string): number {
    if (value === null || value === undefined) {
        throw new CalculatorError(`${paramName} is required`);
    }

    const num = Number(value);

    if (isNaN(num)) {
        throw new CalculatorError(`${paramName} must be a valid number`);
    }

    if (!isFinite(num)) {
        throw new CalculatorError(`${paramName} must be a finite number`);
    }

    return num;
}

export function validateOperation(a: unknown, b: unknown): CalculatorOperation {
    const numA = validateNumber(a, 'a');
    const numB = validateNumber(b, 'b');

    return { a: numA, b: numB };
}

export function add(a: number, b: number): number {
    const result = a + b;

    if (!isFinite(result)) {
        throw new CalculatorError('Addition resulted in infinite value');
    }

    return result;
}

export function subtract(a: number, b: number): number {
    const result = a - b;

    if (!isFinite(result)) {
        throw new CalculatorError('Subtraction resulted in infinite value');
    }

    return result;
}

export function multiply(a: number, b: number): number {
    const result = a * b;

    if (!isFinite(result)) {
        throw new CalculatorError('Multiplication resulted in infinite value');
    }

    return result;
}

export function divide(a: number, b: number): number {
    if (b === 0) {
        throw new CalculatorError('Division by zero is not allowed');
    }

    const result = a / b;
    // Removido a condicional, e os testes ainda passam, logo, não há testes validando
    // if (!isFinite(result)) {
    //     throw new CalculatorError('Division resulted in infinite value');
    // }

    return result;
}

export function createResult(
    result: number,
    operation: string,
    inputs: CalculatorOperation
): CalculatorResult {
    return {
        result,
        operation,
        inputs
    };
}
