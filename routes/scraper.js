const express=require('express')
const  router=express.Router()
const pup=require('puppeteer')

router.get('/scraper/:location',function (req,res,next) {
    const location=req.params.location
    scrapeWeather(location).then(weather => {res.send(weather)})
    //res.send('TASK API')

})

module.exports= router

async function scrapeWeather(location) {
    const url='https://www.google.com/search?q=weather '+location
    const browser=await pup.launch()
    const page=await browser.newPage()
    await page.goto(url)

    //icon
    const [el]=await page.$x('//*[@id="wob_tci"]')
    const src=await el.getProperty('src')
    const srcTxt=await src.jsonValue()

    //location name
    const [el2]=await page.$x('//*[@id="wob_loc"]')
    const loc=await el2.getProperty('textContent')
    const locTxt=await loc.jsonValue()

    //temperature
    const [el3]=await page.$x('//*[@id="wob_tm"]')
    const temp=await el3.getProperty('textContent')
    const tempTxt=await temp.jsonValue()

    //humidity
    const [el4]=await page.$x('//*[@id="wob_hm"]')
    const hum=await el4.getProperty('textContent')
    const humTxt=await hum.jsonValue()

    //windspeed
    const [el5]=await page.$x('//*[@id="wob_ws"]')
    const wind=await el5.getProperty('textContent')
    var windTxt=await wind.jsonValue()
    windTxt=windTxt.replace( 'קמ"ש', 'km/h')

    const weather={'icon':srcTxt,'name':locTxt,'temperature':tempTxt+'°C','humidity':humTxt,'windspeed':windTxt}
    //console.log(weather)

    browser.close()

    return weather

}

