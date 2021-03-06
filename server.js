const express = require('express');
const hbs= require('hbs');
const fs = require('fs');

const port=process.env.PORT || 3000;

var app =express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url} ${req.ip}`;
    console.log(log);
    fs.appendFile('server.log',log +'\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    });

    next();
});

// app.use((req,res,next)=>{
//     res.render('maintence.hbs');
// }) TEsTE 6

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('capitalize', (text)=>{
    return text.toUpperCase();
});

app.get('/',(req,res)=>{
  
    res.render('home.hbs',{
        pageTitle:'HOMI',
        curte:'rola grossa'
    });
});

app.get('/portfolios',(req,res)=>{

     res.render('portfolios.hbs',{
         pageTitle:'Portfolios',
         
     });
 });
 

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page',
        
    });
});

app.get('/bad',(req,res) =>{
    res.send({
        errorMessage:'badrequest :('
    });
});
app.listen(port, ()=>{
    console.log(`Server is up and running on port ${port}`);
});