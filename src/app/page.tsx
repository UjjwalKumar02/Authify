"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function Home() {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-6xl mb-6 italic">Auth app</h1>
        <p className="text-center text-lg">
          A simple end-to-end authentication web app.
        </p>
        <hr />
        <hr />
        <div className="flex items-center justify-center">
          <button
            onClick={() => {
              router.push("/login");
              setLoading(true);
            }}
            className="bg-black text-white px-6 py-1.5 hover:bg-gray-800 cursor-pointer border border-black"
          >
            {loading ? "Loading" : "Login"}
          </button>
          <button
            onClick={() => {
              router.push("/create-account");
              setLoading(true);
            }}
            className="bg-white text-black px-6 py-1.5 hover:bg-gray-100 cursor-pointer border border-black"
          >
            {loading ? "..." : "Signup"}
          </button>
        </div>
      </div>
    </div>
  );
}
