const mongoose=require("mongoose");

const numberSchema=new mongoose.Schema({
   number:{type:String},
   assign:{type:Number},
   otp:{type:String},
   timestamp : { type : Date, default: Date.now },
   currentNumber:{type:String},
   purpose:{type:String}
})

module.exports=mongoose.model("Number",numberSchema);
