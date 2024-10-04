import { NextRequest, NextResponse } from "next/server";
import {
  add_user_to_group,
  check_group_password,
  is_user_in_group,
} from "../../utils/dbUtils";

interface Join_Data {
  GID: string;
  UID: string;
  Password: string;
}

export async function POST(request: NextRequest) {
  const group: Join_Data = await request.json();

  // 既にグループに参加しているか確認
  const isInGroup = await is_user_in_group(group.GID, group.UID);

  if (isInGroup) {
    return NextResponse.json({ message: "Already in group." });
  }

  // パスワードを確認
  const isPasswordValid = await check_group_password(group.GID, group.Password);

  if (!isPasswordValid) {
    return NextResponse.json({ message: "Invalid password." });
  }

  // ユーザーをグループに追加
  await add_user_to_group({ GID: group.GID, UID: group.UID, Role: "Member" });
  return NextResponse.json({ message: "Joined group successfully." });
}
