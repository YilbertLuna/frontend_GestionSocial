import { NextResponse } from "next/server";

export function middleware(request) {

    const jwt = request.cookies.get('token')

    if (jwt) return NextResponse.next()
    else return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: '/'
};
