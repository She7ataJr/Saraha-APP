import mongoose, { connect } from "mongoose";


const connectDB=async ()=>{
    return await mongoose.connect(process.env.DB_LOCAL)
    .then(result=>{console.log(`DB .....................connected`)})
    .catch(err=>(`Fail to connect DB ..................${err}`))
}
export default connectDB