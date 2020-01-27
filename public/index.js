var searchLocation

updateWeather()
//req weather every interval
setInterval(function() {
    updateWeather()
}, 300000)

//get req to scraper
function getWeather(location, _callback) {
    const xhr=new XMLHttpRequest()
    xhr.open('GET','http://localhost:3002/api/scraper/'+location)
    xhr.addEventListener('load',()=>{
        var data= JSON.parse(xhr.response)
        console.log(data)
        res=data
        _callback(data)
    })
    xhr.send()
}

    function updateWeather () {

    getWeather('tel aviv',function (data) {
        document.getElementById("tlv-loc").innerHTML = data.name
        document.getElementById("tlv-temperature").innerHTML = data.temperature
        document.getElementById("tlv-humidity").innerHTML = data.humidity
        document.getElementById("tlv-windspeed").innerHTML = data.windspeed
        document.getElementById("tlv-icon").src = data.icon
    })

    getWeather('haifa',function (data) {
        document.getElementById("haifa-loc").innerHTML = data.name
        document.getElementById("haifa-temperature").innerHTML = data.temperature
        document.getElementById("haifa-humidity").innerHTML = data.humidity
        document.getElementById("haifa-windspeed").innerHTML = data.windspeed
        document.getElementById("haifa-icon").src = data.icon
    })

    var urlString =window.location.href
    // console.log(urlString)
        var urlArr=urlString.split('=')
        if(urlArr[1]!=''&&urlArr[1]!=undefined){
            searchLocation=urlArr[1]
            document.getElementById("input").value =searchLocation
            getWeather(searchLocation,function (data) {
                document.getElementById("anywhere-loc").innerHTML = data.name
                document.getElementById("anywhere-temperature").innerHTML = data.temperature
                document.getElementById("anywhere-humidity").innerHTML = data.humidity
                document.getElementById("anywhere-windspeed").innerHTML = data.windspeed
                document.getElementById("anywhere-icon").src = data.icon
            })

        }else {
            document.getElementById("anywhere-div").style.display = "none"
        }
}


