const path =  require('path')  
const express =  require('express')  
const hbs =  require('hbs')  
const fs =require('fs')
const { v4: uuidv4 } = require('uuid');

const events =require('./actions/events')

const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')))
const viewsPath = path.join(__dirname,'templates/views')
const partialPath = path.join(__dirname,'templates/partial')
console.log(uuidv4())
app.set('views', viewsPath)
app.set('view engine','hbs')
// hbs.registerPartials(partialPath);
app.get('',(req,res) =>{
res.render('index',{
    'title':'Be Active AP',
    'data':[]
})
})
app.get('/events', (req, res) => {
    res.send( 
       events.listEvents()
    )
})

app.post('/events', (req, res) => {
    events.addEvent(req.body.title, req.body.data)
    res.send( 
        
       {"error": false , "response": "Event Added"}

    )
    // console.log(req.body.title, req.body.data)
})

app.delete('/events', (req, res) => {
    res.send( 
       {"error": false , "response": "Event Deleted"}
    )
    console.log(req.body)
})


app.listen(80,()=>{
    console.log('server on')
})