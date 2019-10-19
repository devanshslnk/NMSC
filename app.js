const express=require("express");
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