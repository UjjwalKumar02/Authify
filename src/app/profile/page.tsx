"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Nav from "@/components/Nav";



export default function ProfilePage() {

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

    } catch (error: unknown) {
      console.log("Error in logout: ", error);

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
      <Nav/>
      <div className="min-h-screen flex justify-center items-center text-gray-700">
        <div 
        className="flex flex-col justify-center items-center md:gap-8 gap-6 md:py-13 md:px-18 px-9 py-11 rounded-lg"
        >
          <h1 className="text-3xl text-center  font-semibold text-blue-500">
            {username}
          </h1>
          
          <ul className="flex flex-col gap-3 text-lg items-center border border-gray-200 p-7 rounded-lg">
            <li 
            className="cursor-pointer"
            >
              Reset password
            </li>
            <li
              onClick={onLogout} 
              className="cursor-pointer"
            >
              {loading ? "Loading..." : "Logout"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}