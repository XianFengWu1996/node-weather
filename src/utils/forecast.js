const request = require("request")

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=0dccd0c77ecbf71ccd2749e7cb86b669&query=${lat},${long}&units=f`

    request({ url, json: true}, (error, {body}) => {
        if(error){ 
            callback('Unable to connect to weather service', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else {
            let current = body.current

            callback(undefined, {
                description: current.weather_descriptions[0],
                temperature: current.temperature,
                feelslike: current.feelslike,
            })
        }
    })
}

module.exports = {
    forecast
}