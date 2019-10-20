const express=require("express");
const bparser=require("body-parser");
const session=require("express-session");
const mongoStore=require("connect-mongo")(session);
const mongoose=require('mongoose');
const multer = require("multer");
const VoiceResponse = require('twilio').twiml.VoiceResponse;
// const schedule=require("node-schedule");
const cron =require("node-cron")

const User =require("./models/User")
const Number =require("./models/Numbers");
const login=require("./routes/login");
const home=require("./routes/home");
const app=express();
mongoose.connect('mongodb://nmsc:nmsc123@ds153841.mlab.com:53841/nmsc', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});


app.set('view engine','ejs');
app.use(session({
    key:"user_sid",
    secret:"sometext",
    resave:false,
    saveUninitialized: false,
    store:new mongoStore({
        url:'mongodb://nmsc:nmsc123@ds153841.mlab.com:53841/nmsc',
        autoRemove:false
    })

}));
app.use(express.static('./public'));
app.use(bparser.urlencoded({extended:true}));
app.use(bparser.json());
app.use(multer({dest : "./uploads"}).any());


 
// var task = cron.schedule(' 30 * * * * *', async ()=>{
//    const currentDate=new Date()
//    const allNumbers=await Number.find({assign:1,timestamp:{$lt:currentDate}})
//    const updateNumbers=await Number.updateMany({assign:1,timestamp:{$lt:currentDate}},{$set:{currentNumber:"",otp:"",timestamp:null,assign:0,purpose:""}})
//    // console.log(allNumbers)

//    // console.log('The answer to life, the universe, and everything!');
 
// });

// task.start()

app.get("/test",async (req,res)=>{
   // const number =new Number({
   //    number:"+12054311381",
   //    assign:0
   // })
   // number.save()
   const currentDate=new Date();
   const intermediate="+12054311381"

   const checkUser= await User.findOne({email:req.session.email,'numbers.number':'+12054311381'});
   console.log(checkUser);


   for(var index in checkUser.numbers){
      // const checkUser= await User.findOne({email:req.session.email,'numbers.number':intermediate});
   }


});

login(app);
home(app);
app.listen(3000);



