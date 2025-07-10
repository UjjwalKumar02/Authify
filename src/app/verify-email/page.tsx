"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Timer from "@/components/Timer.tsx"



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
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-3xl font-semibold mb-5">
          Verify your email
        </h1>
        <p className="text-center text-gray-700">
          Verification code sent to "{maskEmail(user.email)}". Check your inbox.
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
          className="bg-gray-100 rounded-lg p-2"
          />
        <hr />
        <hr />
        <button
          onClick={onVerify}
          className="bg-black text-white px-6 py-1.5 rounded-lg hover:bg-gray-800 cursor-pointer"
        >
          {loading ? "Processing..." : "Verify"}
        </button>
        <hr />
        <p>
          Change your email? <Link href={"/create-account"} className="text-blue-500">Sign up</Link>
        </p>
      </div>
    </div>
  );
}