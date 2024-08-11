const mongoose=require("mongoose")
const loginschema=mongoose.Schema(
    {
        name:String,
        username:String,
        password:String
    }
)

    const loginModel=mongoose.model("logindata",loginschema)
    module.exports=loginModel