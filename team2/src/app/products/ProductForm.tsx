"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [location, setLocation] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [userUID, setUserUID] = useState("");

  const router = useRouter();

  useEffect(() => {
    const uid = localStorage.getItem("userUID");
    if (uid) {
      setUserUID(uid);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const createdAt = new Date().toISOString();

    if (!userUID) {
      alert("ログインが必要です。");
      return;
    }

    try {
      await addDoc(collection(db, `Users/${userUID}/Products`), {
        name,
        quantity,
        location,
        expiryDate,
        createdAt,
      });
      alert(name + "を登録しました。");
      router.back();
      setName("");
      setQuantity(1);
      setLocation("");
      setExpiryDate("");
    } catch (error) {
      console.error("エラーが発生しました:", error);
      alert("商品の登録中にエラーが発生しました。");
      router.back();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>商品登録フォーム</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">商品名</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">数量</Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
              min={1}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">保管場所</Label>
            <Input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expiryDate">有効期限</Label>
            <Input
              id="expiryDate"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            登録する
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
