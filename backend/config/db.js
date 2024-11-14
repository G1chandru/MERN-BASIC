import mongoose from "mongoose";

// 

const connectDB = async ()=>{
      try {
          const connect = await mongoose.connect(
            "mongodb+srv://cnjeyakanth:yQAflo0GiaAlzNfh@mern-basic.5vlwx.mongodb.net/",
            {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            }
          );
          console.log("MONGODB COnnected Successfuly!");
      } catch (error) {
         console.log(error)
         process.exit(1);
      }
};




    export default connectDB;