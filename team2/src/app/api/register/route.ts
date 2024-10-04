import { NextRequest, NextResponse } from "next/server";
import { add_login_data, add_user_data } from "../../utils/dbUtils";

interface Users_Origin {
    ID: string;
    Pw: string;
    Name: string;
    Email: string;
    Profile: string;
}

export async function POST(request: NextRequest) {
    const user: Users_Origin = await request.json();
    const UID = await add_login_data({ID: user.ID, Pw: user.Pw});
    if(UID !== "Fail") {
        add_user_data({UID: UID, Name: user.Name, Email: user.Email, Profile: user.Profile});
    }
    else{
        return NextResponse.json({ message: "Failed to register user information." });
    }
    return NextResponse.json({ message: "User registered successfully." });
}