// WEATHER API ACCESS KEY - 54d3e89a99a73b1785de82cb00587b91

const request= require('request')


const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=54d3e89a99a73b1785de82cb00587b91&query=' + lat + ',' + long + '&units=f'

    request ({ url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to weather service!')
        } else if (body.error){
            callback('Unable to find location')
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' +  
                body.current.temperature + ' degrees out. It feels like ' +
                body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast