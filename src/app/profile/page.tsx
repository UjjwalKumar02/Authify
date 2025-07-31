"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Nav from "@/components/Nav";



export default function ProfilePage() {

  const router = useRouter();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);


  // check if token is expired
  const isTokenExpired = (token: string) => {
    try {
      const { exp } = JSON.parse(atob(token.split(".")[1]));
      return exp*1000 < Date.now();

    } catch (error) {
      return true;
    }
  };


  // refresh the accessToken
  const refreshAccessToken = async() => {
    try {
      const res = await axios.post("/api/refresh-token", {}, {
        withCredentials: true,
      });

      // console.log(res);
      const newAccessToken = res.data.accessToken;

      localStorage.setItem("accessToken", newAccessToken);
      return newAccessToken;

    } catch (error) {
      console.log("Token refresh failed");
      // router.push("/");
      return null;
    }
  };


  // load profile
  const loadProfile = async() => {
    try {
      let token = localStorage.getItem("accessToken");

      if (!token) {
        console.warn("Access token not found, try login again");
        // return router.push("/");
      }

      if (isTokenExpired(token!)) {
        console.log("Access token expired, refreshing...");
        token = await refreshAccessToken();
        if (!token) return;
      }

      const res = await axios.get("/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsername(res.data.username);

    } catch (error) {
      console.log("Error loading profile, try login again.", error);
      // router.push("/");
    }
  };


  // logout
  const onLogout = async() => {
    try {
      setLoading(true);
      await axios.get("/api/logout");
      
      console.log("Logout successful");

      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");

      router.push("/");

    } catch (error: unknown) {
      console.log("Error in logout: ", error);

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadProfile();
  }, []);


  return(
    <div className="min-h-screen">
      <Nav/>
      <div className="min-h-screen flex justify-center items-center text-gray-700">
        <div 
        className="flex flex-col justify-center items-center md:gap-8 gap-6 md:py-13 md:px-18 px-9 py-11 rounded-lg"
        >
          <h1 className="text-3xl text-center  font-semibold text-blue-500">
            {username || "Loading..."}
          </h1>
          
          <ul className="flex flex-col gap-3 text-lg items-center border-t border-gray-200 p-7 rounded-lg">
            {/* <li 
            className="cursor-pointer"
            >
              Reset password
            </li> */}
            <li
              onClick={onLogout} 
              className="cursor-pointer"
            >
              {loading ? "Logging out..." : "Logout"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}