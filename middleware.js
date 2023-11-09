import {NextResponse} from 'next/server'

export const config = {
  matcher: ["/admin/:path*"],
};

export default function middleware(request) {
  // if (request.cookies.get("token")===undefined) {
  //   return NextResponse.redirect(`${request.nextUrl.origin}/account/login`);
  // }  
}
