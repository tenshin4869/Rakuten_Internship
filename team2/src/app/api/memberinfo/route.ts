import { NextRequest, NextResponse } from "next/server";
import { get_group_members } from "../../utils/dbUtils";

export async function POST(request: NextRequest) {
  const { GID } = await request.json();
  const groupMembers = await get_group_members(GID);
  return NextResponse.json(groupMembers);
}
