import { NextRequest, NextResponse } from "next/server";
import { get_user_goods } from "../../utils/dbUtils";

interface User_Data {
  UID: string;
}

export async function POST(request: NextRequest) {
  const user: User_Data = await request.json();
  const goods = await get_user_goods(user.UID);
  return NextResponse.json(goods);
}
