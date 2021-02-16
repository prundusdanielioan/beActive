const path =  require('path')  
const express =  require('express')  
const hbs =  require('hbs')  
const fs =require('fs')


const events =require('./actions/events')

const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')))
const viewsPath = path.join(__dirname,'templates/views')
const partialPath = path.join(__dirname,'templates/partial')
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
    events.addEvent(req.body.title, req.body.day, req.body.month, req.body.year)
    res.send( 
        events.listEvents()
    )
    // console.log(req.body.title, req.body.data)
})

app.delete('/events', (req, res) => {
    events.removeEvent(req.body.id)
    console.log(req.body.id)

    res.send(events.listEvents())

})


app.listen(80,()=>{
    console.log('server on')
})