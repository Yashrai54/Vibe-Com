import mongoose from 'mongoose'

export const ConnectDB=async()=>{
    try {
        const db=await mongoose.connect(process.env.MONGO_URI)
        console.log("db connected")
    } catch (error) {
        console.error("Error in db connection",error)
    }
}