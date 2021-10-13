const path = require('path')

const express = require('express')
const hbs = require('hbs')

const { geocode} = require('./utils/geocode')
const { forecast } = require('./utils/forecast')

const app = express()


const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Andrew Mead'    })
})

app.get('/about', (req, res) => {
    res.render('help', {
        title: 'About Page',
        name: 'Andrew Mead', 
       })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please make sure to include address'
        })
    }

    geocode(req.query.address, (error, {lat, long, name} = {} = {}) => {
        if(error){
            return res.send({
                error: 'Try a different location'
            })
        }

        forecast(lat, long, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })           
            }

            res.send({
                location: name,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })

   
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'About Page',
        name: 'Andrew Mead', 
        message: 'No Help article found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'About Page',
        name: 'Andrew Mead', 
        message: 'The page you looking for does not exist'
    })
})

app.listen(3000, () => {
    console.log('Serve is up on localhost: 3000')
})