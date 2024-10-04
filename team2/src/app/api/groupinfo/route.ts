import { NextResponse } from "next/server";
import { show_all_groups } from "../../utils/dbUtils";

export async function GET() {
  const Group_Info = await show_all_groups();
  return NextResponse.json(Group_Info);
}
