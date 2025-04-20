import { NextResponse } from 'next/server';
import { signin } from '@/actions/signin';

export async function POST(req: Request) {
    const body = await req.json();
    const result = await signin(body);

    if (result?.error) {
        return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
}
