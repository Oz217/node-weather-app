// imports
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

    //import utility finctions
    const getCoord = require('./utils/locationCoord')
    const forecast = require('./utils/forecast')

//Define paths for Express config 
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsDirectoryPath = path.join(__dirname,'../templates/views')
const partialsDirectoryPath = path.join(__dirname,'../templates/partials')
const stylePath = '/css/defultStyle.css'

//Define server port
const port = process.env.PORT || 3000
//server serve public folder to client
app.use(express.static(publicDirectoryPath))


//Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

//respond to main page request
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        author:'Oz Shahori',
        stylePath: stylePath
    })
})

//respond to about page request
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        author:'Moshe Bativa',
        stylePath: stylePath
    })
})

//respond to help page request
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        author:'Mr. Pizza',
        stylePath: stylePath
    })
})

//respond to /weather page request
app.get('/weather',(req,res)=>{
    if(!req.query.adress){
        return res.send({
            Error:'yout must query an adress'
        })
    }

    const coords = getCoord(req.query.adress,(error,data)=>{
        if(error){
            return  res.send({
                Error: ">>> Forcast error - probably bad input <<<"
            })
        }
        forecast(data.longitude, data.latitude, data.name,(error,forcastData)=>{
        if(error){
            return  res.send({
                Error: "forecast function error"
            })
        }
        res.send({
            forecast:forcastData,
            loctions:data.name,
            adress:req.query.adress
        })
    })
  })
})
//respond to help page-not-found
app.get('/help/*',(req,res)=>{
    res.render('PageNotFound',{
        title:'Help',
        message:'The current help page wasn\'t found.',
        stylePath: stylePath
    })
})

//respond to help page-not-found
app.get('*',(req,res)=>{
    res.render('PageNotFound',{
        title:'Message 404',
        message:'Sorry! your page was\'nt found',
        stylePath: stylePath
    })
})

app.listen(port,()=>{
    console.log('server listening on port'+ port)
})
