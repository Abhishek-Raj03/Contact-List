const express=require('express');
const path=require('path');
const port=7000;
//require mongoose file
const db=require('./config/mongoose');
const Contact=require('./models/contact');

const app=express();

app.set('view engine','ejs');  //setting up template engine
app.set('views',path.join(__dirname,'views'));  //telling the path to template engine using views
app.use(express.urlencoded()); //middleware to use req.body
app.use(express.static('assets')) 

var contactList=[
    {
        name:"Abhishek Raj",
        phone:7903988544
    },
    {
        name:"Mummy",
        phone:8409338765
    },
    {
        name:"bhai",
        phone:8340404124
    },
    {
        name:"Papa",
        phone:9525549507
    },
]


app.get('/',function(req,res){
   
    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in displaying db');
            return;
        }
        const obj={
            title:"My Contact LIst",
            contact_list:contacts
        };
        return res.render('home',obj);
        
    })
    
    //return res.render('home',obj);
})
app.get('/practice',function(req,res){
    return res.render('practice',{title:"play with ejs"});
})

app.post('/create-contact',function(req,res){
    // contactList.push({  //name and phone are of form
    //     name: req.body.name,
    //     contact: req.body.phone
    // });
    // contactList.push(req.body);
    // console.log(req.body);
    //  return res.redirect('back');
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
      if(err){
        console.log('error in creating db');
        return;
      }
      console.log('*******',newContact);
      return res.redirect('back');
    });
});

app.get('/delete-contact/',(req,res)=>{
    // console.log(req.query);
    // let phone=req.query.phone;
    // let index=contactList.findIndex(function(ele){
    //     return ele.phone==phone;
    // })
    // contactList.splice(index,1);
    // return res.redirect('back');
    // console.log(req.query.ide);    
    // Contact.deleteOne({_id:ide},function(err,rem){});
    let ide=req.query.ide;
    Contact.findByIdAndDelete(ide,function(err){
        if(err){
            console.log('error in deleting db');
            return;
        }
        return res.redirect('back');
    });
})


app.listen(port,function(err){
    if(err){
        console.log('error');
        return;
    }
    console.log('server is up and running at port ',port);
})
