var express=require('express');
var app=express();
var fs = require('fs');
app.set('views', './views');
app.set('view engine', 'ejs');
// app.set('view engine','ejs');
require('dotenv').config();
var debug = require('debug')('http');
var morgan = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false})); // support encoded bodies
// app.use('/assets', express.static('./public'));
app.set('view engine', 'ejs');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 2525,
  service: 'gmail',
  auth: {
    user: 'helpify123@gmail.com',
    pass: '02512609841'
  }
});

var mysql = require('mysql');
var con = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "2609841",
 database: "blood"
});
app.use(express.static(path.join(__dirname, '/public')));
// app.use(express.static(__dirname + '/public'));
 con.connect(function(err) {
  if (err) throw  err;
  console.log("connected");});
var mysqlAdmin = require('node-mysql-admin');
app.use(mysqlAdmin(app));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'index.html'));
});
app.get('/donate', (req, res,next) => {
  res.sendFile(path.join(__dirname,'donate.html'));
});
app.get('/bank', (req, res) => {
  var err=false;
  var corr=false;
  var t=false;
  res.render('bank',{err:err,corr:corr,t:t});
});

app.get('/admin', function(req,res) {
  var err=false;
  var corr=false;
  res.render('admin',{err:err});
  // body...
});




app.post('/donate', function(req, res) {
  console.log(req.body.add);
  
  var sql = "INSERT INTO bhagu (fname,lname,address,city,phoneno,email,age,blood,gender,rh,dobc) VALUES ('"+req.body.fname+"','"+req.body.lname+"','"+req.body.add+"','"+req.body.city+"','"+req.body.phoneno+"','"+req.body.email+"','"+req.body.age+"','"+req.body.blood+"','"+req.body.gender+"','"+req.body.rh+"','"+req.body.date+"')";
  con.query(sql, function(err, result)  {
    // console.log("i am query")
   if(err) throw err;
   console.log(err);
   });
  res.sendFile(path.join(__dirname,'index.html'));
});

app.post('/admin', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  console.log(username);
  console.log(password);
    con.query('SELECT * FROM admin WHERE username = ? AND password = ?', [username, password], function(err, result, fields) {
      if (err) throw err;
      
      if (result.length > 0) {

        res.redirect('/bank');
      } else {
        var err=true;
        res.render('admin',{err:err})
      }     
    });

});

app.post('/bank', function(req, res) {
  var blood= req.body.blood;
  var city = req.body.city;
  var rh=req.body.rh;
  var gen=req.body.gender;
  var req=req.body.requ;
  console.log(req);
// if(req=="0"){
  if (city || gen )
  { 

    if(city && gen)
  {
      con.query('SELECT * FROM bhagu WHERE blood = ? AND rh = ? AND city = ? AND gender = ? ', [blood,rh,city,gen], function(err, result, fields) {
      if (err) throw err;
      console.log("me in and operation");
      if (result.length > 0) 
      {
        var err=true;
        var corr=false;
        res.render('bank',{err:err,data:result,corr:corr});
      
      } 
      
      else
      {
        var err=false;
        var corr=true;
        res.render('bank',{err:err,corr:corr});

      }
    });
  }
  else
  {
    if(city)
  
  {
      con.query('SELECT * FROM bhagu WHERE blood = ? AND rh = ? AND city = ? ', [blood,rh,city], function(err, result, fields) {
      if (err) throw err;
      if (result.length > 0) 
      {

        var err=true;
        var corr=false;
        res.render('bank',{err:err,data:result,corr:corr});
      } 
      
      else
      {
        var err=false;
        var corr=true;
        res.render('bank',{err:err,corr:corr});
      }
    });
  }
    if(gen)
  {
      con.query('SELECT * FROM bhagu WHERE blood = ? AND rh = ? AND gender = ? ', [blood,rh,gen], function(err, result, fields) {
      if (err) throw err;
      if (result.length > 0) 
      {

        var err=true;
        var corr=false;
        res.render('bank',{err:err,data:result,corr:corr});
      } 
      
      else
      {
        var err=false;
        var corr=true;
        res.render('bank',{err:err,corr:corr});
      }
    });
  }
  }  
  }
  else 
    {
      con.query('SELECT * FROM bhagu WHERE blood = ? AND rh = ? ', [blood,rh], function(err, result, fields) {
      if (err) throw err;
      if (result.length > 0) 

      {
        console.log(result[0].email);
        var err=true;
        var corr=false;
        res.render('bank',{err:err,data:result,corr:corr});
      }
      else
      {

        var err=false;
        var corr=true;
        res.render('bank',{err:err,corr:corr});
      } 
    });
    }
// }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// res.sendFile(path.join(__dirname,'index.html'));

});

app.post('/delete/:_id', function(req, res, next){
var ser=req.params._id;
con.query('SELECT * FROM bhagu WHERE id = ?',[ser], function(err, result, fields) {
  if (err) throw err;
  var s=result[0].email;  
  if (result.length > 0) 
  {
    if(result[0].rh=='0')
    {
      var s="+";
    }
    else{
      var s='-';
    }
    var mailOptions = {
    from: 'helpify123@gmail.com',
    to:result[0].email,
    subject: 'Bring a life back to power',
    text: 'hello '+result[0].fname+' ,Urgent requirement for '+result[0].blood+s+' Blood & Blood Platelets in helpify Hospital.Plz come forward and help us.Plz contact on 9811055007, 9717195195, 9891515150.'
    };    
 
// console.log(Object.assign({}, mailOptions)); 
  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
     console.log('Email sent: ' + info.response);
  }
}); 
}    
    });
// res.redirect('back');
});
app.post('/acc', function(req, res, next)
{
var blood= req.body.blood;
  var city = req.body.city;
  var rh=req.body.rh;
  var gen=req.body.gender;
    if (city || gen )
  {
      if(city && gen)
    {
      con.query('SELECT * FROM bhagu WHERE blood = ? AND rh = ? AND city = ? AND gender = ? ', [blood,rh,city,gen], function(err, result, fields) {
      if (err) throw err;
      if (result.length > 0) 
      {
        result.forEach(element => { 
          if(element.rh=='0')
          {
          var s="+";
          }
          else
          {
            var s='-';
          }
          var mailOptions = {
          from: 'helpify123@gmail.com',
          to:element.email,
          subject: 'Bring a life back to power',
          text: 'hello '+element.fname+' ,Urgent requirement for '+element.blood+s+' Blood & Blood Platelets in helpify Hospital.Plz come forward and help us.Plz contact on 9811055007, 9717195195, 9891515150.'
            };    
 
// console.log(Object.assign({}, mailOptions)); 
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
          });
        }); 
        var err=false;
        var corr=false;
        var t=true;
        res.render('bank',{err:err,corr:corr,t:t});
      
      } 
      
      else
      {
        var err=false;
        var corr=true;
        var t=false;
        res.render('bank',{err:err,corr:corr,t:t});

      }
    });
  }
  else
  {
    if(city)
  
  {
      con.query('SELECT * FROM bhagu WHERE blood = ? AND rh = ? AND city = ? ', [blood,rh,city], function(err, result, fields) {
      if (err) throw err;
      if (result.length > 0) 
      {

        result.forEach(element => { 
          if(element.rh=='0')
          {
          var s="+";
          }
          else
          {
            var s='-';
          }
          var mailOptions = {
          from: 'helpify123@gmail.com',
          to:element.email,
          subject: 'Bring a life back to power',
          text: 'hello '+element.fname+' ,Urgent requirement for '+element.blood+s+' Blood & Blood Platelets in helpify Hospital.Plz come forward and help us.Plz contact on 9811055007, 9717195195, 9891515150.'
            };    
 
// console.log(Object.assign({}, mailOptions)); 
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
          });
        });
        var err=false;
        var corr=false;
        var t=true;
        res.render('bank',{err:err,corr:corr,t:t});
      } 
      
      else
      {
        var err=false;
        var corr=true;
        var t=false;
        res.render('bank',{err:err,corr:corr,t:t});
      }
    });
  }
    if(gen)
  {
      con.query('SELECT * FROM bhagu WHERE blood = ? AND rh = ? AND gender = ? ', [blood,rh,gen], function(err, result, fields) {
      if (err) throw err;
      if (result.length > 0) 
      {

        result.forEach(element => { 
          if(element.rh=='0')
          {
          var s="+";
          }
          else
          {
            var s='-';
          }
          var mailOptions = {
          from: 'helpify123@gmail.com',
          to:element.email,
          subject: 'Bring a life back to power',
          text: 'hello '+element.fname+' ,Urgent requirement for '+element.blood+s+' Blood & Blood Platelets in helpify Hospital.Plz come forward and help us.Plz contact on 9811055007, 9717195195, 9891515150.'
            };    
 
// console.log(Object.assign({}, mailOptions)); 
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
          });
        });
        var err=false;
        var corr=false;
        var t=true;
        res.render('bank',{err:err,corr:corr,t:t});
      } 
      
      else
      {
        var err=false;
        var corr=true;
        var t=false;
        res.render('bank',{err:err,corr:corr,t:t});
      }
    });
  }
  }  
  }
  else 
    {
      con.query('SELECT * FROM bhagu WHERE blood = ? AND rh = ? ', [blood,rh], function(err, result, fields) {
      if (err) throw err;
      if (result.length > 0) 

      {
        result.forEach(element => { 
          if(element.rh=='0')
          {
          var s="+";
          }
          else
          {
            var s='-';
          }
          var mailOptions = {
          from: 'helpify123@gmail.com',
          to:element.email,
          subject: 'Bring a life back to power',
          text: 'hello '+element.fname+' ,Urgent requirement for '+element.blood+s+' Blood & Blood Platelets in helpify Hospital.Plz come forward and help us.Plz contact on 9811055007, 9717195195, 9891515150.'
            };    
 
// console.log(Object.assign({}, mailOptions)); 
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
          });
        });
        var err=false;
        var corr=false;
        var t=true;
        res.render('bank',{err:err,corr:corr,t:t});
      }
      else
      {

        var err=false;
        var corr=true;
        var t=false;
        res.render('bank',{err:err,corr:corr,t:t});
      } 
    });
    }



});




app.listen(3000);
console.log('you are listening to port 3000')

