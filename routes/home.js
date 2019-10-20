const session=require("express-session")
const Number =require("../models/Numbers");
const User=require("../models/User");
const multer = require("multer");
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const twilio=require("twilio").twiml;

module.exports=(app)=>{
   app.get("/home",async (req,res)=>{
      if(req.session.email!==undefined){
         const currentUser=await User.findOne({email:req.session.email})
         const assignedNumbers=await Number.find({currentNumber:currentUser.phno})
         const tableContents=[]
         for(var index in assignedNumbers){
            var row={
               number:assignedNumbers[index].number,
               purpose:assignedNumbers[index].purpose,
               expiry:assignedNumbers[index].timestamp
            }
            tableContents.push(row)
         }
         
         res.render("user/index",{email:req.session.email,tableContents:tableContents})


      }else{
         res.redirect("/login")
      }
   })

   app.post("/home",async (req,res)=>{
      const purpose = req.body.purpose;
      const days=parseInt(req.body.days);
      const currentDate=new Date()
      currentDate.setDate(currentDate.getDate() + days);
    
      const numberObject=await Number.findOne({$or:[{assign:1},{timestamp:{$lt:new Date()}}]});
   
      const appendNumber=await User.findOneAndUpdate({email:req.session.email},{$push:{numbers:numberObject.number}});

      const updatedObject=await Number.findOneAndUpdate({number:numberObject.number},{assign:1,currentNumber:appendNumber.phno,otp:"",timestamp:currentDate})
      
      res.render("user/index",{email:req.session.email,number:numberObject.number,tableContents:[]});
      
   });

   app.get("/hit",async(req,res)=>{
      console.log("hit")
      console.log(req.query.Digits);

   });
   app.post('/twilio/callback/:number',async (req,res) => {
      const intermediate="+"+req.params.number;
      const checkAssign=await Number.findOne({number:intermediate})
      const twiml = new VoiceResponse();
      
      if(checkAssign!=null){
         const currentDate=new Date();
         if(checkAssign.timestamp>currentDate){
            
            // console.log(checkAssign)
            // twiml.gather({ numDigits: 4 }, gatherNode => {
            //    // gatherNode.say('For sales, press 1. For support, press 2.');
            //    console.log(gatherNode);
            //  });
            if(req.body.Digits===undefined){
               const gather=twiml.gather({
                  action:"/twilio/callback/"+req.params.number,
                  
               })
               gather.say("enter number");

            }
            else if(req.body.Digits!==undefined){
               const otp=req.body.Digits.toString();
               const assignedNumber=await Number.findOne({number:intermediate,otp:otp});
               if(assignedNumber!=null){
               const dial = twiml.dial({
                  // callerId: '+918850392965'
                  callerId:intermediate
                  // callerId:'+918850285032'
               });

               dial.number('+91'+checkAssign.currentNumber);

               res.writeHead(201, { 'Content-Type': 'text/xml' });
               res.end(twiml.toString());
               return 
            }
            }            
            
            res.writeHead(201, { 'Content-Type': 'text/xml' });
            res.end(twiml.toString());

         
         }
      
      
      }else{

         twiml.say("Good bye!!");

         res.writeHead(201, { 'Content-Type': 'text/xml' });
         res.end(twiml.toString());
   
      }

   // twiml.dial('8850 392 965');

   })

}