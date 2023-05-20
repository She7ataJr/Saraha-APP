import mongoose, { connect } from "mongoose";

const connectDB = async () => {
  return await mongoose
    .connect('mongodb+srv://she7atajr:Aa100100@cluster0.fgvvarh.mongodb.net/?retryWrites=true&w=majority')
    .then((result) => {
      console.log(`DB .....................connected`);
    })
    .catch((err) => `Fail to connect DB ..................${err}`);
};
export default connectDB;
