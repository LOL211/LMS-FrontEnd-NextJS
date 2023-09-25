import GetfetchTemplate from "@/components/fetchTemplate/fetchTemplate";
import { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { classname: string; testname: string } }
) {
    return await GetfetchTemplate(
        request,
        process.env.BACKEND_API_URL +
            "/api/v1/test/teacher/" +
            params.classname +
            "/" +
            params.testname
    );
}
