const request = require('request')

//get location and return it's coodinates 
//---------------------------------------
const getCoord = (place,callback)=> {
    const mapUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+place+'.json?access_token=pk.eyJ1Ijoib3pzaCIsImEiOiJjazY2cG8xcTAwamRtM3Nuc2t6NnhoaDVlIn0.JR2CYtD-waUQV256H676HQ'
    request({url: mapUrl,json:true},(error,response)=>{
        if(error){ //no server connection
            callback('Could not connect to serever',undefined)
        }else if(response.body.features.length==0){ //invalid input
            callback('Invalid input',undefined)
        }else if(response.body.features.length){ //valid input
                callback(undefined, {
                    name:response.body.features[0].place_name,
                    longitude: response.body.features[0].center[1],
                    latitude: response.body.features[0].center[0]
                })
        } 
    })//end of request
}//end getCoord

module.exports = getCoord