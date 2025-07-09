"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";



export default function createUserPage(){

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: ""
  });
  

  const onSignup = async() => {
    try {
      if(!user.email || !user.username || !user.password){
        alert("All fields are required!");
        return;
      }

      setLoading(true);
      const response = await axios.post("/api/create-account", user);
      console.log("Signup successful.", response.data);
      router.push("/verify-email");

    } catch (error: any) {
      console.log("Signup failed : ", error.message);

    } finally {
      setLoading(false);
    }
  }


  return(
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-3xl font-semibold mb-5">
          Create an account
        </h1>
        <label htmlFor="email">Email</label>
        <input 
          id="email"
          type="email"
          placeholder="Enter your email"
          value={user.email}
          onChange={(e) => setUser({...user, email: e.target.value})}
          className="bg-gray-100 rounded-lg p-2 w-full"
          />
        <hr />
        <label htmlFor="username">Username</label>
        <input 
          id="username"
          type="text"
          placeholder="Enter your username"
          value={user.username}
          onChange={(e) => setUser({...user, username: e.target.value})}
          className="bg-gray-100 rounded-lg p-2 w-full"
          />
        <hr />
        <label htmlFor="password">Password</label>
        <input 
          id="password"
          type="password"
          placeholder="Enter your password"
          value={user.password}
          onChange={(e) => setUser({...user, password: e.target.value})}
          className="bg-gray-100 rounded-lg p-2 w-full"
          />
        <hr />
        <hr />
        <button
          onClick={onSignup}
          className="bg-black text-white px-6 py-1.5 rounded-lg hover:bg-gray-800 cursor-pointer"
        >
          {loading ? "Processing" : "Signup"}
        </button>
        <hr />
        <p>
          Already had a account? <Link href={"/login"} className="text-blue-500">Login here</Link>
        </p>
      </div>
    </div>
  );
}