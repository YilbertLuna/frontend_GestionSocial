import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {

  const jwt = request.cookies.get('token')
  if(!jwt) return NextResponse.redirect(new URL('/login', request.url));

  try {
      const { payload, protectedHeader } = await jwtVerify(
        jwt.value,
        new TextEncoder().encode(process.env.TOKEN_SECRET)
      );
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    '/',
    '/registro/nuevo-registro',
    '/registro/busqueda-solicitante'
  ]
};
