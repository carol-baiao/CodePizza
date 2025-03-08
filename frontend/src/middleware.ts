import { NextRequest, NextResponse } from "next/server";
import { getCookieServer } from "@/lib/cookieServer"; 
import { api } from "./services/api";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl; // pegando a rota acessada

    if(pathname.startsWith("/_next") || pathname === "/" || pathname === "/signup") { // se for pagina inicial
        return NextResponse.next();
    }
    
    const token = await getCookieServer();
    console.log(token);

    if(!token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    const isValid = await validateToken(token);

    if(!isValid) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

async function validateToken(token: string) {
    console.log(token);
    if(!token) return false;

    try {
        await api.get("/userinfo", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}