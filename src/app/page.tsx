"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Nav from "@/components/Nav";



export default function Home() {

  const router = useRouter();
  const [loadingSignup, setLoadingSignup] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Nav/>
      <div 
      className="flex flex-col items-center justify-center gap-2 p-2"
      >
        <h1 className="md:text-4xl text-3xl mb-3 font-semibold">
          Authify
        </h1>
        <p className="text-center text-lg text-gray-700">
          A nextjs app that implements jwt-based authentication.
        </p>
        <hr />
        <hr />
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => {
              router.push("/login");
              setLoadingLogin(true);
            }}
            className="bg-black text-white px-9 py-1.5 hover:bg-gray-800 cursor-pointer rounded-lg"
          >
            {loadingLogin ? "Processing" : "Login"}
          </button>
          <button
            onClick={() => {
              router.push("/create-account");
              setLoadingSignup(true);
            }}
            className="bg-blue-600 text-white px-9 py-1.5 hover:bg-blue-700 cursor-pointer rounded-lg "
          >
            {loadingSignup ? "Processing" : "Signup"}
          </button>
        </div>
      </div>
    </div>
  );
}
