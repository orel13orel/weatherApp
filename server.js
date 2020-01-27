const express=require('express')
const path=require('path')
const bodyParser=require('body-parser')

const index=require('./routes/index')
const scraper=require('./routes/scraper')

const app=express()

//view engine
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.engine('html',require('ejs').renderFile)

//set static folder
app.use(express.static(path.join(__dirname,'public')))

//body-parser MW
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//routs
app.use('/',index)
app.use('/api',scraper)

const port=3002
app.listen(port,function (error) {
    if(error){
        console.log(error)
    }else {
        console.log('server is listening on port: '+port)
        console.log('http://localhost:'+port+'/')

    }
})




