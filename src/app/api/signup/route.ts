// app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import * as z from 'zod';
import { SignupSchema } from '@/utils';

export async function POST(req: Request) {
    const body = await req.json();

    const validated = SignupSchema.safeParse(body);
    if (!validated.success) {
        return NextResponse.json({ message: 'Invalid fields!' }, { status: 400 });
    }

    const { name, email, password } = validated.data;

    try {
        const res = await fetch(`${process.env.API_BASE_URL}/account/sign-up/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json(
                { success: false, message: data['email'][0] || 'Signup failed.' },
                { status: res.status }
            );
        }

        return NextResponse.json({ success: true, message: data.message });
    } catch (err) {
        console.error('Signup error:', err);
        return NextResponse.json(
            { success: false, message: 'Internal server error.' },
            { status: 500 }
        );
    }
}
