import mongoose from "mongoose";


export async function connectDb(){
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully!");
    })

    connection.on("error", (err) => {
      console.log("MongoDB connection error : ", err);
      process.exit();
    })

  } catch (error: any) {
    console.log("Something went wrong while connecting database: " + error.message);
  }
}