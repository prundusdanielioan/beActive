const path =  require('path')  
const express =  require('express')  
const hbs =  require('hbs')  

const app = express()
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
 
app.listen(80,()=>{
    console.log('server on')
})