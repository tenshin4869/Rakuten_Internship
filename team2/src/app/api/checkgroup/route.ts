import { NextRequest, NextResponse } from "next/server";
import { is_user_in_group } from "../../utils/dbUtils";

interface GroupCheckData {
  GID: string;
  UID: string;
}

export async function POST(request: NextRequest) {
  const { GID, UID }: GroupCheckData = await request.json();
  const inGroup = await is_user_in_group(GID, UID);
  return NextResponse.json({ inGroup });
}
