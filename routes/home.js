const session=require("express-session")

module.exports=(app)=>{
   app.get("/home",async (req,res)=>{
      if(req.session.email!==undefined){
         // res.render("home",{email:req.session.email})
         res.render("user",{email:req.session.email})
      }else{
         res.redirect("/login")
      }
   })
}