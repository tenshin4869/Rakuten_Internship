"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Member {
  UID: string;
  Name: string;
  Role: string;
}

interface Good {
  id: string;
  name: string;
  quantity: number;
  location: string;
  expiryDate: string;
}

export default function GroupDetailPage() {
  const { GID } = useParams();
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMemberGoods, setSelectedMemberGoods] = useState<Good[]>([]);
  const [selectedMemberName, setSelectedMemberName] = useState<string>("");

  useEffect(() => {
    fetchMembers();
  }, [GID]);

  const fetchMembers = async () => {
    const response = await fetch("/api/memberinfo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ GID }),
    });
    const data = await response.json();
    setMembers(data);
  };

  const fetchMemberGoods = async (UID: string, Name: string) => {
    const response = await fetch("/api/userinfo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ UID }),
    });
    const data = await response.json();
    setSelectedMemberGoods(data);
    setSelectedMemberName(Name);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center text-red-800">
          グループ詳細
        </h1>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-3xl font-semibold mb-6 text-red-700">
              メンバー一覧
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {members.map((member) => (
                <button
                  key={member.UID}
                  onClick={() => fetchMemberGoods(member.UID, member.Name)}
                  className="flex flex-col items-center p-4 bg-red-50 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <div className="w-20 h-20 bg-red-200 rounded-full flex items-center justify-center mb-3">
                    <svg
                      className="w-10 h-10 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-red-800 text-center">
                    {member.Name}
                  </span>
                  <span className="text-sm text-red-600 mt-1">
                    {member.Role}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            {selectedMemberName ? (
              <div>
                <h2 className="text-3xl font-semibold mb-6 text-red-700">
                  {selectedMemberName}の登録グッズ
                </h2>
                <div className="space-y-6">
                  {selectedMemberGoods.map((good) => (
                    <div
                      key={good.id}
                      className="bg-red-50 p-5 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xl font-semibold text-red-800">
                          {good.name}
                        </h3>
                        <span className="px-3 py-1 bg-red-200 text-red-800 text-sm font-bold rounded-full">
                          {good.quantity}個
                        </span>
                      </div>
                      <div className="text-md text-red-700">
                        <p className="mb-1">
                          <span className="font-medium">保管場所:</span>{" "}
                          {good.location}
                        </p>
                        <p>
                          <span className="font-medium">有効期限:</span>{" "}
                          {good.expiryDate}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-xl text-red-600">
                  メンバーを選択してください
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
