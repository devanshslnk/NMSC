const session=require("express-session");
const User=require("../models/User");

module.exports=(app)=>{
   app.get("/login",async (req,res)=>{
      if(req.session.email!==undefined)
      {
         console.log("Received at the wrong end")
         res.redirect("/home");
      }else{
         res.render("user/login",{email : null});
      }
  
  });

  

   app.post("/login",async (req,res)=>{
      // const email=req.body.email;
      // const password=req.body.password;
      const {email, password} = req.body;

      const user= await User.findOne({email:email, password : password});
      if( user === null ){
         res.render("user/login",{message:"user does not exits"});
      } else {
         if(user.password===password){
            req.session.email=email;
            req.session.password=password;
            res.redirect("/home");
         }else{
            res.render("user/login",{message:"wrong password"});
         }
      }


   });

   app.get("/signup",(req,res)=>{
      if(req.session.email!==undefined){
         res.redirect("/home");
      }else{
         res.render("user/new",{message:null})
      }
   });
  app.post("/signup",async (req,res)=>{
      // const email=req.body.email;
      // const name=req.body.name;
      // const password=req.body.password;
      // const phoneNumber=req.body.number;
      const {email, name, password, confirmPassword, number : phoneNumber} = req.body;
      console.log(req.body,email,name,password,phoneNumber);
      if( password !== confirmPassword ){
         res.redirect("/signup");
      } else {
         const  NewUser=new User({
            name:name,
            email:email,
            password:password,
            phno:phoneNumber
         });

         const user = await User.findOne({email:email})
         
         if(user === null){
               NewUser.save((err)=>{
                  console.log(err)
               });
               req.session.email=email;
               req.session.password=password;
               res.redirect("/login")
            }else{
               res.render("user/new",{message:"User already exits"});
         }
      }
});
      



   app.get('/logout',(req,res)=>{
      req.session.destroy((err)=>{
         if(err)
            console.log(err);
         });
         req.session = null;
         res.redirect("/login")
      });
}