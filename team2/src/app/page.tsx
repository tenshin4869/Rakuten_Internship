"use client";

import "./globals.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { NextResponse } from "next/server";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import ProductList from "./components/ProductList";
import { db } from "@/lib/firebase";
import Header from "./components/Header";
import Group from "./components/Group";

const RAKUTEN_API_ENDPOINT =
  "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601";

type Product = {
  id: string;
  name: string;
  quantity: number;
  location: string;
  expiryDate: string;
  createdAt: string;
};

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  const [ID, setID] = useState("");
  const [Pw, setPw] = useState("");
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Profile, setProfile] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ID, Pw, Name, Email, Profile }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        // 登録成功後にログインページまたは他のページにリダイレクト
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred during registration.");
    }
  };

  return (
    <div>

      <h1>新規登録</h1>
      <Link href="/login">ログイン</Link>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="ID"
          value={ID}
          onChange={(e) => setID(e.target.value)}
        />
        <input
          type="password"
          placeholder="パスワード"
          value={Pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <input
          type="text"
          placeholder="名前"
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="メールアドレス"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="プロフィール"
          value={Profile}
          onChange={(e) => setProfile(e.target.value)}
        />
        <button type="submit">登録</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default Home;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword") || "防災グッズ";
  const appId = process.env.RAKUTEN_APP_ID;
  console.log("RAKUTEN_APP_ID:", process.env.RAKUTEN_APP_ID);
  if (!appId) {
    console.error("Rakuten Application IDが設定されていません。");
    return NextResponse.json(
      { error: "Rakuten Application IDが設定されていません。" },
      { status: 500 }
    );
  }

  const url = `${RAKUTEN_API_ENDPOINT}?applicationId=${appId}&keyword=${encodeURIComponent(
    keyword
  )}&hits=20`;
  console.log(
    "Rakuten APIからデータを取得",
    url.replace(appId, "APP_ID_HIDDEN")
  );

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Rakuten API でエラーが発生しました。　status: ${response.status}`
      );
    }

    const data = await response.json();
    console.log("Rakuten APIからのデータ取得に成功しました");
    return NextResponse.json(data);
  } catch (error) {
    console.error("プロダクトの取得に失敗しました。", error);
    return NextResponse.json(
      { error: "プロダクトの取得に失敗しました。", details: error },
      { status: 500 }
    );
  }
}