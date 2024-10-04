"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [ID, setID] = useState("");
  const [Pw, setPw] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ID, Pw }),
      });

      const data = await response.json();
      if (data.UID) {
        // ログイン成功時の処理
        alert("Login successful!");
        localStorage.setItem("userUID", data.UID);
        router.push("/MyList"); // ログイン後のページにリダイレクト
      } else {
        setError("Invalid login credentials.");
      }
    } catch (error) {
      setError("An error occurred during login.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="ID"
          value={ID}
          onChange={(e) => setID(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={Pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
