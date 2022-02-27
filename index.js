const express = require('express');
const path = require('path');
const port = 8001;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


var contactList = [
    {
        name: "Ravi",
        phone: "1111111111"
    },
    {
        name: "aman",
        phone: "1234567890"
    },
    {
        name: "shani",
        phone: "12131321321"
    }
]

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "Let us play with ejs"
    });
});


app.get('/', function(req, res){


    Contact.find({}, function(err, contacts){
        if(err){
            console.log("error in fetching contacts from db");
            return;
        }
        return res.render('home',{
            title: "Contact List",
            contact_list: contacts
        });

    })
  
})
app.post('/create-contact', function(req, res){
     
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){console.log('Error in creating a contact!')
            return;}
            console.log('******', newContact);
            return res.redirect('back');
    })
  

});

app.get('/delete-contact/',function(req,res){
    console.log(req.query);

    // get the query from url
    // let phone = req.query.phone;

    // get the id fro the database
    let id  = req.query.id;
    
    //  find the index
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    // if the index is not found.
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }

    // find the contact in the database using id and delete

    Contact.findByIdAndDelete(id,function(err,){
        if(err){
            console.log('Error In deleting the object from the database');
            return ;
        }
        return res.redirect("back");
    });

    

});



//  app.get('/about',function (req,res) {
//      res.send("<h1>I am using Express.js for making Basic Contact List App");

//  });

app.listen(port, function (error) {
    if (error) {
        console.log("Error in running the server", error);
    }
    else{
    console.log("My Express server are running on port", port);
    }
});