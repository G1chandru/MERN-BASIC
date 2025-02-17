import  mongoose from "mongoose";
import bcrypt from "bcryptjs"
const userSchema = mongoose.Schema({
      name:{
         type:String,
         required:true
      },
      email:{
         type:String,
         required:true,
         unique:true
      },
      password:{
        type:String,
        required:true
      }
      ,isAdmin:{
        type:Boolean,
        default:false
    },
}, {
    timestamps:true
})


userSchema.pre('save',async function(next){
    if(!this.isModified('password'))
    {
       return  next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt)
    next();
})


userSchema.methods.checkPassword =  async function(givenPassword) 
{   
   
    return await bcrypt.compare(givenPassword,this.password);
}

const User = mongoose.model("User", userSchema);

export default User;
