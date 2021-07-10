// MAPBOX API ACCESS KEY - pk.eyJ1IjoibWF0dGhld2thbGUiLCJhIjoiY2txOTQzZGNpMDMyMjJ2b2ttd24ya293ZCJ9.0B3D2fNpCUddYoGDb4VzIg

const request= require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWF0dGhld2thbGUiLCJhIjoiY2txOTQzZGNpMDMyMjJ2b2ttd24ya293ZCJ9.0B3D2fNpCUddYoGDb4VzIg&limit=1'

    request ({ url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to location services!')
        } else if (body.features.length === 0){
            callback('Unable to find location. Try another search.')
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode