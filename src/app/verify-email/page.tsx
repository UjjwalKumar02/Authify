"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Nav from "@/components/Nav";



export default function VerifyEmailPage(){

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ email: "", verificationCode: "" });


  const onVerify = async() => {
    try {
      if(!user.verificationCode){
        alert("Enter code!");
        return;
      }

      setLoading(true);
      const response = await axios.post("/api/verify-email", user);
      console.log("Verification successful!", response.data);
      router.push("/login");

    } catch (error: unknown) {
      console.log("Verification failed: ", error);

    } finally {
      setLoading(false);
      localStorage.removeItem("userEmail");
    }
  }


  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    setUser({ email: userEmail || "", verificationCode: "" });
  }, [])


  function maskEmail(emailId: string) {
    const [name, domain] = emailId.split("@");
    const maskedEmail = name.slice(0, 3) + "***";
    return maskedEmail + "@" + domain;
  }


  return(
    <div className="min-h-screen flex items-center justify-center">
      <Nav/>
      <div 
      className="flex flex-col items-center justify-center gap-2 border border-gray-200 md:px-10 md:py-11 px-9 py-10 rounded-lg"
      >
        <h1 className="text-xl font-semibold mb-5">
          Verify your email
        </h1>
        <p className="text-center text-gray-700">
          A one-time code has been sent to &quot;{maskEmail(user.email)}&quot;. 
          <br />
          Please check your inbox.
        </p>
        <hr />
        <hr />
        <input 
          id="verificationCode"
          type="text"
          value={user.verificationCode}
          onChange={(e) => setUser({...user, verificationCode: e.target.value})}
          placeholder="Enter the code"
          className="bg-gray-100 rounded-lg md:py-2 md:px-3 md:w-66 w-62 py-1.5 px-2"
          />
        
        <button
          onClick={onVerify}
          className="bg-black text-white px-6 py-1.5 rounded-lg hover:bg-gray-800 cursor-pointer mt-4"
        >
          {loading ? "Processing..." : "Continue"}
        </button>
        <hr />
        <p className="text-gray-700">
          Wrong email? <Link href={"/create-account"} className="text-blue-500 underline">Change it here</Link>
        </p>
      </div>
    </div>
  );
}