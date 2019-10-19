const mongoose = require('mongoose')

const User = new mongoose.Schema({
	name: {type:String, trim:true, defualt:''},
	phno: {type:String, trim:true, defualt:''},
	email: {type:String, trim:true, defualt:''},
   password: {type:String, trim:true, defualt:''},
   numbers:[
      {type:String, trim:true, defualt:''}

   ]
})

module.exports = mongoose.model('User',User);

