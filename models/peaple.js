const mongoose=require("mongoose")
const dataschema=mongoose.Schema(
    {
        fullname:String,
        phnumber:String,
        village:String,
        place:String,
        pincode:String,
        housenum:String,
        missingdate:String,
        aadharnum:String,
        gender:String,
        age:String,
    }
)

const dataModel=mongoose.model("missing_datas",dataschema)
module.exports=dataModel