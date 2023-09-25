import GetfetchTemplate from "@/components/fetchTemplate/fetchTemplate";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    return await GetfetchTemplate(
        request,
        process.env.BACKEND_API_URL + "/api/v1/user/details"
    );
}
