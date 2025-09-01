import { NextRequest, NextResponse } from 'next/server';
import { subtract, validateOperation, createResult, CalculatorError } from '@/lib/calculator';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { a, b } = body;

        const inputs = validateOperation(a, b);
        const result = subtract(inputs.a, inputs.b);

        return NextResponse.json(
            createResult(result, 'subtraction', inputs),
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof CalculatorError) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const a = searchParams.get('a');
        const b = searchParams.get('b');

        const inputs = validateOperation(a, b);
        const result = subtract(inputs.a, inputs.b);

        return NextResponse.json(
            createResult(result, 'subtraction', inputs),
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof CalculatorError) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
