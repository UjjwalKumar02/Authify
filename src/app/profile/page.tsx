"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function profilePage() {

  const router = useRouter();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);


  const onLogout = async() => {
    try {
      setLoading(true);
      await axios.get("/api/logout");
      console.log("Logout successful");
      localStorage.removeItem("username");
      router.push("/");

    } catch (error: any) {
      console.log("Error in logout: ", error.message);

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const username = localStorage.getItem("username");
    setUsername(username || "");
  }, []);


  return(
    <div className="min-h-screen">
      <nav className="w-full fixed flex justify-center items-center p-4 border-b border-gray-300">
        <h1 className="text-3xl italic">Auth app</h1>
      </nav>
      <div className="min-h-screen flex flex-col justify-center items-center gap-7">
        <h1 className="text-3xl text-center">
          Welcome, {username}
        </h1>
         
        <div className="flex justify-center items-center flex-wrap ">
          <button
          className="bg-blue-500 text-white px-6 py-1.5  cursor-pointer hover:bg-blue-600"
          >
            Reset Password (soon...)
          </button>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-6 py-1.5  cursor-pointer hover:bg-red-600"
          >
            {loading ? "Loading..." : "Logout"}
          </button>
        </div>
        
      </div>
    </div>
  );
}