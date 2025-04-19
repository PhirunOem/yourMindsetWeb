
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const data = await request.json();
    console.log("Saved stress result:", data);

    // You could save to a database here
    return NextResponse.json({ message: "Result saved successfully" });
}
