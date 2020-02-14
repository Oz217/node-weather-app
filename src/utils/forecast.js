const request = require('request')

//get weather@ coordinates
//------------------------
const forecast= (longitdute,latitude,name,callback)=>{
    const wheaterUrl = 'https://api.darksky.net/forecast/f9f2ddb0d9ee09ed9389fbbac088f580/'+longitdute+','+latitude+'?units=si'
    request({url: wheaterUrl,json:true},(error,response)=>{
        if(error){ //no server connection
            callback('Could not connect to serever',undefined)
        }else if(response.body.error){ //invalid input
            callback('Invalid input',undefined)
        }else{//valind input
                callback(undefined,'Current weather in '+name+ ':' +response.body.currently.temperature+'[C] out.'+
                '\nThere is '+response.body.currently.precipProbability+'% chance of rain.')
        }
    })//end of request
}//end getWeather

module.exports = forecast

