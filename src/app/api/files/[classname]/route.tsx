import GetfetchTemplate from "@/components/fetchTemplate/fetchTemplate";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { classname: string } }
) {
    return await GetfetchTemplate(
        request,
        process.env.BACKEND_API_URL + "/api/v1/file/" + params.classname
    );
}

export async function POST(
    request: NextRequest,
    { params }: { params: { classname: string } }
) {
    const authToken = request.headers.get("Authorization");
    if (authToken == null) {
        return NextResponse.json({ error: "No bearer token" }, { status: 400 });
    }
    const response = await fetch(
        process.env.BACKEND_API_URL +
            "/api/v1/file/teacher/" +
            params.classname,
        {
            method: "POST",
            headers: {
                Authorization: authToken,
            },
            body: await request.formData(),
        }
    );

    return new NextResponse(await response.text(), {
        status: response.status,
    });
}
