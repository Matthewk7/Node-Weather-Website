const path = require('path')
const express = require('express')
const hbs = require('hbs')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const { kMaxLength } = require('buffer')


const app = express()
const port = process.env.PORT || 3000

const swaggerOptions={
    definition: {
        openapi:'3.0.0',
        info: {
            title: 'Weather API',
            version: '1.0.0',
            description:'Weather API to check the weather',
            contact: {
                name: "Matthew Kale",
                url: "codingscape.com",
                email: "Matthewjkale@gmail.com"
            },
            servers:[port]
        }
    },
    apis: [__filename]
}
const swaggerDocs = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


/**
 * @swagger
 * /:
 *   get:
 *     description: Returns the homepage
 *     responses:
 *       200:
 *         description: Weather
 */
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Matthew Kale'
    })
})

/**
 * @swagger
 * /about:
 *   get:
 *     description: Returns the about page
 *     responses:
 *       200:
 *         description: about
 */
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Matthew Kale'
    })
})

/**
 * @swagger
 * /help:
 *   get:
 *     description: Returns the help page
 *     responses:
 *       200:
 *         description: help
 */
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is some helpful text.',
        name: 'Matthew Kale'
    })
})

/**
 * @swagger
 * /weather:
 *   get:
 *     description: Returns the weather
 *     responses:
 *       200:
 *         description: weather
 */
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {
        if (error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
})

// app.get('/products', (req, res) => {
//     if(!req.query.search){
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req, res) => {
    res.status(404).render('404', {
        title: '404',
        error: 'Help article not found.',
        name: 'Matthew Kale'
    })
})

app.get('*', (req, res) => {
    res.status(404).render('404', {
        title: '404',
        error: 'Page not found.',
        name: 'Matthew Kale'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


// app.com
// app.com/help
// app.com/about