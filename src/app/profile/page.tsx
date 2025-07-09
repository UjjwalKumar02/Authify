"use client"
import axios from "axios";
import { useRouter } from "next/navigation";



export default function profilePage() {

  const router = useRouter();


  const onLogout = async() => {
    try {
      await axios.get("/api/logout");
      console.log("Logout successful");
      router.push("/");

    } catch (error: any) {
      console.log("Error in logout: ", error.message);
    }
  };


  return(
    <div className="min-h-screen flex items-center justify-center">
      <div className="">
        <button
          onClick={onLogout}
          className="bg-black text-white px-6 py-1.5 rounded-lg hover:bg-gray-800 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}