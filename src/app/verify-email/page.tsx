"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";



export default function verifyEmailPage(){
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    verificationCode: ""
  });


  const onVerify = async() => {
    try {
      if(!user.email || !user.verificationCode){
        alert("All fields are required!");
        return;
      }

      setLoading(true);
      const response = await axios.post("/api/verify-email", user);
      console.log("Verification successful!", response.data);
      router.push("/login");

    } catch (error: any) {
      console.log("Verification failed: ", error.message);

    } finally {
      setLoading(false);
    }
  }


  return(
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-3xl font-semibold mb-5">
          Verify your email
        </h1>
        <p className="w-70 text-center italic mb-5">A verification code has been sent to your email. Please check your inbox.</p>
        <label htmlFor="email">Email</label>
        <input 
          id="email"
          type="email"
          placeholder="Enter your email"
          value={user.email}
          onChange={(e) => setUser({...user, email: e.target.value})}
          className="bg-gray-100 rounded-lg p-2 "
          />
        <hr />
        <label htmlFor="verificationCode">Code</label>
        <input 
          id="verificationCode"
          type="password"
          value={user.verificationCode}
          onChange={(e) => setUser({...user, verificationCode: e.target.value})}
          className="bg-gray-100 rounded-lg p-2 "
          />
        <hr />
        <hr />
        <button
          onClick={onVerify}
          className="bg-black text-white px-6 py-1.5 rounded-lg hover:bg-gray-800 cursor-pointer"
        >
          {loading ? "Processing" : "Verify"}
        </button>
        <hr />
        <p>
          Update your email, <Link href={"/create-account"} className="text-blue-500">Signup here</Link>
        </p>
      </div>
    </div>
  );
}