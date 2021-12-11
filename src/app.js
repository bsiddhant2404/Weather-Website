const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname, '../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'siddhant'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About us',
        name:'sid and vrit'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'This is some useful text as an example',
        title:'Help',
        name:'siddhant'
    })
})

app.get('/weather',(req,res)=>{   //req is for request and res is for response
    if(!req.query.address){
        return res.send({
            error:'Address required'
        })
    }
    
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })
        })
    })
 })

app.get('/products',(req,res)=>{
    if(!req.query.search){
    return res.send({
    error:'You must provide a search term'
})
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'siddhant',
        errorMessage:'Help article not find'
    })
})

app.get('*',(req,res)=>{
res.render('404',{
    title:'404',
    name:'siddhant',
    errorMessage: 'Page not found'
})
})

//app.com
//app.com/help
//app.com/about

app.listen(port,()=>{
    console.log('Server is up on port.' + port)
})