"use client";
import { useRouter } from "next/navigation";



export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-6xl font-semibold mb-6">Auth app</h1>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => router.push("/login")}
            className="bg-black text-white px-6 py-1.5 rounded-lg hover:bg-gray-800 cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/create-account")}
            className="bg-blue-600 text-white px-6 py-1.5 rounded-lg hover:bg-blue-500 cursor-pointer"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}
