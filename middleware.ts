import { NextRequest, NextResponse } from "next/server";

// Note: I'm using a root wildcard here, because in my code, I want to protect every single route for authentication
export const config = {
  matcher: ["/:path*"],
};

export default async function _middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname === "/test") {
    console.log(
      `🔵 ${new Date().toISOString()} | Request for "Test" page | Method: ${
        req.method
      }`
    );
  }

  return NextResponse.next();
}
