import { NextRequest, NextResponse } from "next/server";

export async function POST(
    request: NextRequest,
    {
        params,
    }: { params: { classname: string; testname: string; studentID: number } }
) {
    const authToken = request.headers.get("Authorization");
    if (authToken == null) {
        return NextResponse.json({ error: "No bearer token" }, { status: 400 });
    }

    const res = await request.json();

    const response = await fetch(
        process.env.BACKEND_API_URL +
            "/api/v1/test/teacher/" +
            params.classname +
            "/" +
            params.testname +
            "/" +
            params.studentID,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: authToken,
            },
            body: JSON.stringify({ newScore: res.newScore }),
        }
    );
    const text = await response.text();

    if (response.status == 200) {
        return new NextResponse(text, { status: 200 });
    } else {
        return new NextResponse(text, { status: response.status });
    }
}
