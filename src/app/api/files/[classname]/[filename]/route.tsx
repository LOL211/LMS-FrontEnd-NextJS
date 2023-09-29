import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { classname: string; filename: string } }
) {
    const authToken = request.headers.get("Authorization");
    if (authToken == null) {
        return NextResponse.json({ error: "No bearer token" }, { status: 400 });
    }
    const response = await fetch(
        process.env.BACKEND_API_URL +
            "/api/v1/file/" +
            params.classname +
            "/" +
            params.filename,
        {
            method: "GET",
            headers: {
                Authorization: authToken,
            },
        }
    );

    if (response.status == 200) {
        return new NextResponse(response.body, {
            status: response.status,
            // headers: response.headers,
        });
    } else
        return new NextResponse(await response.text(), {
            status: response.status,
        });
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { classname: string; filename: string } }
) {
    const authToken = request.headers.get("Authorization");
    if (authToken == null) {
        return NextResponse.json({ error: "No bearer token" }, { status: 400 });
    }
    const response = await fetch(
        process.env.BACKEND_API_URL +
            "/api/v1/file/teacher/" +
            params.classname +
            "/" +
            params.filename,
        {
            method: "DELETE",
            headers: {
                Authorization: authToken,
            },
        }
    );

    return new NextResponse(await response.text(), {
        status: response.status,
    });
}
