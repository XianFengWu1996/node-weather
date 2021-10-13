const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2hhd253dTYiLCJhIjoiY2t1bjI4d2I3MjFrdjJ1b2Y5aG8xN3ozNSJ9.2yOEnAZBRLhBVwuT7zIPmg&limit=1`

    request({ url, json: true }, (error, { body }) => {
        if(error){
            callback('Unable to connect to location service', undefined)
        } else if(!body.features){
            callback('Unable to get lat/long', undefined)
        } else {
            let data = body.features

            if(data.length > 0){
                callback(undefined, {
                    lat: data[0].center[1], 
                    long: data[0].center[0],
                    name: data[0].place_name
                })
            } else {
                callback('try a different location', undefined)
            }
        
            
        }
    })
}

module.exports = {
    geocode
}