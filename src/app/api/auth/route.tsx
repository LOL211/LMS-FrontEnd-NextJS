import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const res = await request.json();

    const token = await fetch(
        process.env.BACKEND_API_URL + "/api/v1/auth/authenticate",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: res.email, password: res.password }),
        }
    );

    if (token.status == 200) {
        const jsonResponse = await token.json();
        return NextResponse.json(
            { token: jsonResponse.token },
            { status: 200 }
        );
    } else return new NextResponse("failed", { status: 403 });
}
