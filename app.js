const express=require("express");


const app=express();

app.get("/test",()=>{
   res.send("Working");
});

app.listen(3000);
