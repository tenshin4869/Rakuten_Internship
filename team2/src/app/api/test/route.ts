import { NextRequest, NextResponse } from "next/server";
//import { Users_Data } from "../../utils/dbUtils";

export async function GET() {
    /*
    const userData: Users_Data = {
        UID: 2,
        Name: "addTest",
        Email: "jane.doe@example.com",
        Profile: "test",
    };
    addData(userData);
    */
    return NextResponse.json(
    { message: "Hello World" },
    {
        status: 200,
    }
    );
}
