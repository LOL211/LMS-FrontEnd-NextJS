import GetfetchTemplate from "@/components/fetchTemplate/fetchTemplate";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { classname: string } }
) {
    return await GetfetchTemplate(
        request,
        process.env.BACKEND_API_URL + "/api/v1/test/student/" + params.classname
    );
}
