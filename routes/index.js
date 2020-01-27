const express=require('express')
const  router=express.Router()
const path=require('path')


const pathViews = path.join(__dirname, '../views/')

router.get('/',function (req,res,next) {
    res.render('index.html')
})


module.exports= router
