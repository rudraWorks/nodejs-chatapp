// console.log('hello')

const path=require('path');
const express=require('express')
const hbs=require('hbs');
const fs=require('fs')
const { fstat } = require('fs');

const port=process.env.PORT || 3000

const app=express();
const staticPath=path.join(__dirname,'../public/');
const partialsPath=path.join(__dirname,'../templates/partials')
const viewsPath=path.join(__dirname,'../templates/views')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(staticPath));


app.get('/',(req,res)=>{
    let readData=fs.readFileSync(path.join(__dirname,'/myData.txt')).toString()
    return res.render('index',{data:readData})
    res.send('hello');
});
  
app.get('/formsubmit',(req,res)=>{
    
    
    fs.appendFileSync(path.join(__dirname,'/myData.txt'),'•'+req.query.message+'\n')
    return res.redirect('/')
    //let readData=fs.readFileSync(path.join(__dirname,'/myData.txt')).toString()
  
    //return res.render('index',{data:readData})
    // res.send(req.query.message)
    // return
})
app.get('/messagesApi',(req,res)=>{
    let data=fs.readFileSync(path.join(__dirname,'/myData.txt') ).toString() 
    let context={data:data}
    return res.send(context)
})
app.listen(port,()=>{
    console.log('listening on port 3000');
})
