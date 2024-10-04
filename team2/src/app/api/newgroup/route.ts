import { NextRequest, NextResponse } from "next/server";
import { add_group_data, add_user_to_group } from "../../utils/dbUtils";

interface Groups_Data {
  Name: string;
  Owner: string;
  Password: string;
}

export async function POST(request: NextRequest) {
  const group: Groups_Data = await request.json();
  const GID = await add_group_data(group);
  if (GID !== null) {
    await add_user_to_group({ GID: GID, UID: group.Owner, Role: "Owner" });
    return NextResponse.json({ message: "Group created successfully." });
  } else {
    return NextResponse.json({ message: "Failed to create group." });
  }
}
