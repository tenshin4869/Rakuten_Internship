import { NextRequest, NextResponse } from "next/server";
import { check_login_data } from "../../utils/dbUtils";

interface Login_Data {
    ID: string;
    Pw: string;
}

export async function POST(request: NextRequest) {
    const user: Login_Data = await request.json();
    const UID = await check_login_data({ID: user.ID, Pw: user.Pw});
    return NextResponse.json({ UID : UID });
}