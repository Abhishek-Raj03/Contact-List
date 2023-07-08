const mongoose=require('mongoose');

const contactSchema=new mongoose.Schema({   //structure for collection
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    }
});

const Contact=mongoose.model('contact',contactSchema);  //creating collections

module.exports=Contact;