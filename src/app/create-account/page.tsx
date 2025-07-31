"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";



export default function CreateUserPage(){

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ email: "", username: "", password: "" });
  

  const onSignup = async() => {
    try {
      if(!user.email || !user.username || !user.password){
        alert("All fields are required!");
        return;
      }

      setLoading(true);
      const response = await axios.post("/api/create-account", user);
      console.log("Signup successful.", response.data);
      localStorage.setItem("userEmail", user.email);
      router.push("/verify-email");

    } catch (error: unknown) {
      console.log("Signup failed : ", error);

    } finally {
      setLoading(false);
      setUser({ email: "", username: "", password: "" });
    }
  }


  return(
    <div className="min-h-screen flex items-center justify-center">
      <Nav/>
      <div 
      className="flex flex-col items-center justify-center gap-2 border border-gray-200 md:px-10 md:py-11 px-9 py-10 rounded-lg text-gray-700"
      >
        <p className="text-xl mb-6 font-semibold text-center text-black">
          Register
        </p>
        <label htmlFor="username">Username</label>
        <input 
          id="username"
          type="text"
          placeholder="johndoe"
          value={user.username}
          onChange={(e) => setUser({...user, username: e.target.value})}
          className="bg-gray-100 rounded-lg md:py-2 md:px-3 md:w-66 w-62 py-1.5 px-2"
          />
        <hr />
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
          onClick={onSignup}
          className="bg-black text-white px-6 py-1.5 rounded-lg hover:bg-gray-800 cursor-pointer font-semibold mt-4"
        >
          {loading ? "Loading..." : "Signup"}
        </button>
        <hr />
        <p>
          Already have an account? <Link href={"/login"} className="text-blue-500 underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}