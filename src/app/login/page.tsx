"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";



export default function LoginPage(){

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });


  const onLogin = async() => {
    try {
      if(!user.email || !user.password){
        alert("All fields are required");
        return;
      }

      setLoading(true);
      const response = await axios.post("/api/login", user);
      const { accessToken, username } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("username", username);

      console.log("Login success");
      router.push("/profile");

    } catch (error: any) {
      console.error("Login failed:", error?.response?.data?.error || error.message);
      alert("Login failed: " + (error?.response?.data?.error || "Server error"));

      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");

    } finally {
      setLoading(false);
    }
  };


  return(
    <div className="min-h-screen flex items-center justify-center">
      <Nav/>
      <div 
      className="flex flex-col items-center justify-center gap-2 border border-gray-200  md:px-10 md:py-11 px-9 py-10 rounded-lg text-gray-700"
      >
        <p className="text-xl mb-6 font-semibold text-center text-black">
          Login to your account
        </p>
        <label htmlFor="email">Email</label>
        <input 
          id="email"
          type="email"
          placeholder="your@gmail.com"
          value={user.email}
          onChange={(e) => setUser({...user, email: e.target.value})}
          className="bg-gray-100 rounded-lg md:py-2 md:px-3 md:w-66 w-62 py-1.5 px-2"
          />
        <hr />
        <label htmlFor="password">Password</label>
        <input 
          id="password"
          type="password"
          placeholder="password"
          value={user.password}
          onChange={(e) => setUser({...user, password: e.target.value})}
          className="bg-gray-100 rounded-lg md:py-2 md:px-3 md:w-66 w-62 py-1.5 px-2"
          />
        
        <button
          onClick={onLogin}
          className="bg-black text-white px-6 py-1.5 rounded-lg hover:bg-gray-800 cursor-pointer font-semibold mt-4"
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <hr />
        <p>
          Don&apos;t have an account? <Link href={"/create-account"} className=" text-blue-500 underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}