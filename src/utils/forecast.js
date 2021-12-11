const request=require('request')
const forecast=(latitude,longitude,callback)=>{
const url='http://api.weatherstack.com/current?access_key=9d5ebcc235211df91ddfad0c64842394&query='+ latitude + ',' + longitude + '&units=f'

request({url:url, json: true},(error, response)=>{
    if(error){
        callback('Unable to connect',undefined)
    }else if(response.body.error)
    {
        callback('Unable to find location',undefined)
    }else{
        callback(response.body.current.weather_descriptions[0]+'. It is currently '+response.body.current.temperature+' degress out. It feels like '+response.body.current.feelslike+' degress out.',undefined)
    }
})
}

module.exports=forecast