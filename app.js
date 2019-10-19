const express=require("express");
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
