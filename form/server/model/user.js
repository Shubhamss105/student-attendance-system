import mongoose from "mongoose";

const userSchema= mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    
    rollNo:{
        type:Number,
        required:true
    }
});

const User = mongoose.model('USER',userSchema);
export default User;