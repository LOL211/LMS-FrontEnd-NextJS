import GetfetchTemplate from "@/components/fetchTemplate/fetchTemplate";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { classname: string } }
) {
    return await GetfetchTemplate(
        request,
        process.env.BACKEND_API_URL + "/api/v1/test/teacher/" + params.classname
    );
}

export async function POST(
    request: NextRequest,
    { params }: { params: { classname: string } }
) {
    const authToken = request.headers.get("Authorization");
    if (authToken == null) {
        return new NextResponse("No bearer token", { status: 400 });
    }

    const response = await fetch(
        process.env.BACKEND_API_URL +
            "/api/v1/test/teacher/" +
            params.classname,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: authToken,
            },
            body: JSON.stringify(await request.json()),
        }
    );
    console.log(response);
    if (response.status == 201)
        return new NextResponse(await response.text(), {
            status: 201,
        });
    else
        return new NextResponse(await response.text(), {
            status: response.status,
        });
}
