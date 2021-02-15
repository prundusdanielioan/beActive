const path =  require('path')  
const express =  require('express')  
const hbs =  require('hbs')  
const fs =require('fs')
const { v4: uuidv4 } = require('uuid');


const app = express()
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
        fs.readFileSync('events.json')
    )
})

app.post('/events', (req, res) => {
    res.send( 
       {"error": false , "response": "Event Added"}

    )
    console.log(req.body)
})


app.listen(80,()=>{
    console.log('server on')
})