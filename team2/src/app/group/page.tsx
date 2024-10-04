"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GroupPasswordModal from "../components/GroupPasswordModal";

interface Group {
  GID: string;
  Name: string;
  OwnerName: string;
}

export default function Component() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    const response = await fetch("/api/groupinfo");
    const data = await response.json();
    setGroups(data);
  };

  const handleGroupSelect = async (GID: string) => {
    const userUID = localStorage.getItem("userUID");
    if (!userUID) {
      alert("ログインしてください");
      return;
    }

    const response = await fetch("/api/checkgroup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ GID, UID: userUID }),
    });

    const { inGroup } = await response.json();

    if (inGroup) {
      router.push(`/group/${GID}`);
    } else {
      setSelectedGroup(GID);
      setShowPasswordModal(true);
    }
  };

  const handleJoinGroup = async (password: string) => {
    if (!selectedGroup) return;

    const userUID = localStorage.getItem("userUID");
    if (!userUID) {
      alert("ログインしてください");
      return;
    }

    const response = await fetch("/api/joingroup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        GID: selectedGroup,
        UID: userUID,
        Password: password,
      }),
    });

    const data = await response.json();
    if (data.message === "Joined group successfully.") {
      router.push(`/group/${selectedGroup}`);
    } else {
      alert("グループ参加に失敗しました");
    }

    setShowPasswordModal(false);
  };

  return (
    <div>
      <header>
      <div className="logo">
        <Link href="/">Rakuten SafetyNest</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link
              href="/MyList"
              className={`header-nav-link ${
                location.pathname === "/MyList" ? "active" : ""
              }`}
            >
              My List
            </Link>
          </li>
          <li>
            <Link
              href="/group"
              className={`header-nav-link ${
                location.pathname === "/group" ? "active" : ""
              }`}
            >
              Group
            </Link>
          </li>
          <li className="profile-link">
            <Link
              href ="/profile"
              className={`header-nav-link ${
                location.pathname === "/profile" ? "active" : ""
              }`}
            >
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </header>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        グループ一覧
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {groups.map((group) => (
          <div
            key={group.GID}
            className="flex flex-col items-center justify-center bg-white rounded-full shadow-lg p-6 cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleGroupSelect(group.GID)}
          >
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-center text-gray-800">
              {group.Name}
            </h2>
            <p className="text-sm text-gray-600">{group.OwnerName}</p>
          </div>
        ))}
        <Link
          href="/group/create"
          className="flex flex-col items-center justify-center"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-105">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-800">新規作成</span>
        </Link>
      </div>
      {showPasswordModal && (
        <GroupPasswordModal
          onSubmit={handleJoinGroup}
          onClose={() => setShowPasswordModal(false)}
        />
      )}
    </div>
    </div>
  );
}
