const express=require("express");
<<<<<<< HEAD
const bparser=require("body-parser");
const session=require("express-session");
const mongoStore=require("connect-mongo")(session);
const mongoose=require('mongoose');

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


app.get("/test",(req,res)=>{
   res.send("Working");
});

login(app);
home(app);
app.listen(3000);
=======
const app=express();
const multer = require("multer");
const VoiceResponse = require('twilio').twiml.VoiceResponse;


app.use(express.static(__dirname + "/public/"));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(multer({dest : "./uploads"}).any());
  
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

app.listen(3000,(err)=>err?console.error(err):null);
>>>>>>> c9f8f962da42a243a116d4bbe244f2d0f9cd990a
