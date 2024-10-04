"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import ProductList from "@/app/components/ProductList";
import { db } from "@/lib/firebase";

type Product = {
  id: string;
  name: string;
  quantity: number;
  location: string;
  expiryDate: string;
  createdAt: string;
};

export default function MyList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [userUID, setUserUID] = useState("");

  useEffect(() => {
    // ローカルストレージからユーザーのUIDを取得
    const uid = localStorage.getItem("userUID");
    if (uid) {
      setUserUID(uid);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!userUID) return;

      const querySnapshot = await getDocs(
        collection(db, `Users/${userUID}/Products`)
      );
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productsData);
    };

    fetchProducts();
  }, [userUID]);

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
      <ProductList products={products} />
    </div>
  );
}