import { NextRequest, NextResponse } from "next/server";

export default async function GetfetchTemplate(
    request: NextRequest,
    url: string
) {
    const authToken = request.headers.get("Authorization");
    if (authToken == null) {
        return NextResponse.json({ error: "No bearer token" }, { status: 400 });
    }
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: authToken,
        },
    });

    if (response.status == 200) {
        const jsonResponse = await response.json();
        return NextResponse.json(jsonResponse, {
            status: 200,
        });
    } else
        return NextResponse.json(
            { error: await response.text() },
            { status: response.status }
        );
}
