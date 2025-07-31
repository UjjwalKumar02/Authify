import mongoose from "mongoose";


export async function connectDb(){
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.once("connected", () => {
      console.log("MongoDB connected successfully!");
    });

    connection.on("error", (err) => {
      console.log("MongoDB runtime connection error : ", err);
      process.exit(1);
    });

  } catch (error) {
    console.log("Something went wrong while connecting database: " + error);
  }
}