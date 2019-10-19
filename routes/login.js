const session=require("express-session");
const User=require("../models/User");

module.exports=(app)=>{
   app.get("/login",async (req,res)=>{
        
      if(req.session.email!==undefined)
      {
         res.send("logged in");
      }
      else{
          res.render("login",{message:null});

      }
  
  });

  

   app.post("/login",async (req,res)=>{
      const email=req.body.email;
      const password=req.body.password;
      
      const user= await User.findOne({email:email});
      console.log(user);
      if(user=== null ){
         res.render("login",{message:"user does not exits"});
      }else
      {
         if(user.password===password){
            req.session.email=email;
            req.session.password=password;
            res.redirect("/home");
         }else{
            res.render("login",{message:"wrong password"});
         }
      }


   });

   app.get("/signup",(req,res)=>{
      if(req.session.email!==undefined){
         res.redirect("/home",{email:req.session.email});
      }else{
         res.render("signup",{message:null})
      }
   });
  app.post("/signup",async (req,res)=>{
      const email=req.body.email;
      const name=req.body.name;
      const password=req.body.password;
      const phoneNumber=req.body.number;
      
      const  NewUser=new User({
         name:name,
         email:email,
         password:password,
         phno:phoneNumber,
         number:[]
      });

      const user =await User.findOne({email:email})
      
      if(!user){
            NewUser.save((err)=>{
               console.log(err)
            });
            req.session.email=email;
            req.session.password=password;
            res.redirect("/home",{email:req.session.email})
          }else{
              res.render("signup",{message:"User already exits"});
          }
      });
      



   app.get('/logout',(req,res)=>{
      req.session.destroy((err)=>{
      if(err)
         console.log(err);
      });
      res.redirect("/signup")
      });

}