"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Timer from "@/components/Timer"
import Nav from "@/components/Nav";



export default function VerifyEmailPage(){

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

    } catch (error: unknown) {
      console.log("Verification failed: ", error);

    } finally {
      setLoading(false);
      localStorage.removeItem("userEmail");
    }
  }


  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    setUser({
      email: userEmail || "",
      verificationCode: ""
    });
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
      className="flex flex-col items-center justify-center gap-2 border border-gray-200 px-10 py-11 rounded-lg"
      >
        <h1 className="text-xl font-semibold mb-5">
          Verify your email
        </h1>
        <p className="text-center text-gray-700">
          Verification code sent to &quot;{maskEmail(user.email)}&quot;. Check your inbox.
          <br />
          Your code will expire in <Timer initialMinutes={10} initialSeconds={10} />
        </p>
        <hr />
        <hr />
        <input 
          id="verificationCode"
          type="text"
          value={user.verificationCode}
          onChange={(e) => setUser({...user, verificationCode: e.target.value})}
          placeholder="Enter your code"
          className="bg-gray-100 rounded-lg py-2 px-3 w-66"
          />
        
        <button
          onClick={onVerify}
          className="bg-black text-white px-6 py-1.5 rounded-lg hover:bg-gray-800 cursor-pointer mt-4"
        >
          {loading ? "Processing..." : "Verify"}
        </button>
        <hr />
        <p className="text-gray-700">
          Change your email? <Link href={"/create-account"} className="text-blue-500">Sign up</Link>
        </p>
      </div>
    </div>
  );
}