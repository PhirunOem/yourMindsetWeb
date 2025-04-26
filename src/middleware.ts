import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get("accessToken");

    if (!token && request.nextUrl.pathname.startsWith("/profile") || request.nextUrl.pathname.startsWith("/post")) {
        return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/profile/:path*"],
};
