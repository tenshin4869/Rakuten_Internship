"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRouter } from "next/navigation";

// 商品データの型定義
type Product = {
  id: string;
  name: string;
  quantity: number;
  location: string;
  expiryDate: string;
  createdAt: string;
};

type CommodityItem = {
  Item: {
    itemUrl: string;
    itemName: string;
    itemPrice: number;
    mediumImageUrls: { imageUrl: string }[];
  };
};

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const router = useRouter();
  const [popupContent, setPopupContent] = useState<string | null>(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState<string | null>(null);
  const [commodity, setProducts] = useState<CommodityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 商品の詳細を表示・非表示に切り替える
  const toggleDetails = (id: string) => {
    setSelectedDetails((prevSelected) => (prevSelected === id ? null : id));
  };

  // ポップアップを表示する
  const showPopup = (index: number) => {
    setPopupContent(`hatena${index + 1}`);
    setPopupVisible(true);
  };

  // ポップアップを閉じる
  const closePopup = () => {
    setPopupVisible(false);
    setPopupContent(null);
  };

  const handleAddNewItem = () => {
    router.push("/products");
  };

  // 楽天APIから商品データを取得する
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/?keyword=防災グッズ`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.Items || []);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          console.error("エラーが発生しました:", error.message);
        } else {
          setError("予期しないエラーが発生しました");
          console.error("予期しないエラーが発生しました:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ローディング表示
  if (loading) {
    return <p className="text-center py-8 text-red-600">Loading...</p>;
  }

  // エラー表示
  if (error) {
    return <p className="text-center py-8 text-red-500">Error: {error}</p>;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-red-50 to-orange-100">
      <div className="flex-1 p-8 overflow-auto">
        <h2 className="text-3xl font-bold mb-6 text-red-800">
          My Disaster Preparedness List
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-red-200 hover:border-red-400 transition-colors duration-300"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-red-700">
                    {product.name}
                  </h3>
                  <button
                    onClick={() => showPopup(index)}
                    className="text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full"
                    aria-label="Show more information"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-red-600 mb-2">
                  数量: {product.quantity}
                </p>
                <p className="text-sm text-red-600 mb-2">
                  場所: {product.location}
                </p>
                <button
                  onClick={() => toggleDetails(product.id)}
                  className="text-sm text-red-500 hover:text-red-600 focus:outline-none focus:underline"
                >
                  {selectedDetails === product.id ? "詳細を隠す" : "詳細を表示"}
                </button>
                {selectedDetails === product.id && (
                  <div className="mt-4 text-sm text-red-600 bg-red-50 p-2 rounded">
                    <p>
                      有効期限:{" "}
                      {new Date(product.expiryDate).toLocaleDateString()}
                    </p>
                    <p>
                      作成日: {new Date(product.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {!isPopupVisible && (
          <button
            onClick={handleAddNewItem}
            className="fixed bottom-8 right-8 bg-red-500 text-white rounded-full p-4 shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200"
            aria-label="Add new item"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          </button>
        )}
      </div>
      <div className="w-1/3 bg-white p-6 overflow-y-auto shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-red-800">
          おすすめ防災グッズ
        </h2>
        <div className="space-y-6">
          {commodity.map((item, index) => (
            <div
              key={index}
              className="border-b border-red-100 pb-4 hover:bg-red-50 transition-colors duration-300 rounded-lg"
            >
              <a
                href={item.Item.itemUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 group p-2"
              >
                <img
                  src={item.Item.mediumImageUrls[0].imageUrl}
                  alt={item.Item.itemName}
                  className="w-24 h-24 object-cover rounded-md border-2 border-red-200 group-hover:border-red-400 transition-colors duration-300"
                />
                <div>
                  <h3 className="text-sm font-medium text-red-700 group-hover:text-red-900 transition-colors duration-200">
                    {item.Item.itemName}
                  </h3>
                  <p className="text-sm text-red-600 mt-1">
                    価格: {item.Item.itemPrice.toLocaleString()}円
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-red-800">追加情報</h3>
              <button
                onClick={closePopup}
                className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full"
                aria-label="Close popup"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <p className="text-red-600">{popupContent}</p>
          </div>
        </div>
      )}
    </div>
  );
}
