"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const JoinGroupPage = () => {
  const [groupID, setGroupID] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleJoinGroup = async (e: React.FormEvent) => {
    e.preventDefault();

    const userUID = localStorage.getItem("userUID");
    if (!userUID) {
      alert("ログインしてください");
      return;
    }

    const response = await fetch("/api/joingroup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ GID: groupID, UID: userUID, Password: password }),
    });

    const data = await response.json();
    if (data.message === "Joined group successfully.") {
      router.push(`/group/${groupID}`);
    } else {
      alert("グループ参加に失敗しました");
    }
  };

  return (
    <div>
      <h1>グループに参加</h1>
      <form onSubmit={handleJoinGroup}>
        <input
          type="text"
          placeholder="グループID"
          value={groupID}
          onChange={(e) => setGroupID(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">参加</button>
      </form>
    </div>
  );
};

export default JoinGroupPage;
