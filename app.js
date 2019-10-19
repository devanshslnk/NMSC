const express=require("express");
const bparser=require("body-parser");
const session=require("express-session");
const mongoStore=require("connect-mongo")(session);
const mongoose=require('mongoose');
const multer = require("multer");
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const login=require("./routes/login");
const home=require("./routes/home");
const app=express();
mongoose.connect('mongodb://nmsc:nmsc123@ds153841.mlab.com:53841/nmsc', {useNewUrlParser: true});

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


app.get("/test",(req,res)=>{
   res.send("Working");
});

login(app);
home(app);
app.listen(3000);


  
app.post('/twilio/callback', (req,res) => {
	const twiml = new VoiceResponse();

	// twiml.dial('8850 392 965');

	const dial = twiml.dial({
		callerId: '+918850285032'
	});
	dial.number('+918850285032');

	// twiml.say("Good bye!!");

    res.writeHead(201, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
})

