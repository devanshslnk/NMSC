const session=require("express-session")
const Number =require("../models/Numbers");
const User=require("../models/User");
const multer = require("multer");
const VoiceResponse = require('twilio').twiml.VoiceResponse;


module.exports=(app)=>{
   app.get("/home",async (req,res)=>{
      if(req.session.email!==undefined){
<<<<<<< HEAD
         
         res.render("home",{email:req.session.email,number:null})


=======
         // res.render("home",{email:req.session.email})
         res.render("user",{email:req.session.email})
>>>>>>> aaca1d60396e231edc38438898ffef4fcd4504e4
      }else{
         res.redirect("/login")
      }
   })

   app.post("/home",async (req,res)=>{
      const purpose=req.body.purpose;
      const days=parseInt(req.body.days);
      const currentDate=new Date()
      currentDate.setDate(currentDate.getDate() + days);
    
      const numberObject=await Number.findOne({assign:0});

      const appendNumber=await User.findOneAndUpdate({email:req.session.email},{$push:{numbers:numberObject.number}});

      const updatedObject=await Number.findOneAndUpdate({number:numberObject.number},{assign:1,currentNumber:appendNumber.phno,otp:"",timestamp:currentDate})
      
      res.render("home",{email:req.session.email,number:numberObject.number});
      
   });

      
   app.post('/twilio/callback/:number',async (req,res) => {
      const intermediate="+"+req.params.number;
      const checkAssign=await Number.findOne({number:intermediate})
 
      const twiml = new VoiceResponse();

      if(checkAssign!=null){
         const currentDate=new Date();
         console.log(checkAssign)
         if(checkAssign.timestamp>currentDate){

            const dial = twiml.dial({
               callerId: '+918850392965'
               // callerId:'+918850285032'
            });
            dial.number('+91'+checkAssign.currentNumber);

            res.writeHead(201, { 'Content-Type': 'text/xml' });
            res.end(twiml.toString());
            return 
         
         }
      
      
      }else{

      twiml.say("Good bye!!");

      res.writeHead(201, { 'Content-Type': 'text/xml' });
      res.end(twiml.toString());
   
      }

   // twiml.dial('8850 392 965');

   })

}