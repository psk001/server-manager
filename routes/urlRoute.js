const express= require('express')
const router= express.Router()

const { Url } = require('../models/url')
const auth= require('../middlewares/auth')


router.get("/", async (req, res)=> {
    try{
        const url= await Url.find().lean()
        return res.status(200).send({
            success: true,
            msg: 'Successfully fetched data',
            data: url
        })
    }
    catch(err){
        return res.status(400).send({
            success: false,
            msg: 'Could not fetch data'
        })
    }
})


router.get("/:id", async (req, res)=> {
    try{
        const url= await Url.findById(req.params.id).lean()

        if (!url) {
            return res.status(404).send({
                success: false,
                msg: 'Data not found'
            })
        }

        return res.status(200).send({
            success: true,
            msg: 'Successfully fetched data',
            data: url
        })
    }
    catch(err){
        return res.status(400).send({
            success: false,
            msg: 'Could not fetch data'
        })
    }
})

router.post("/", auth, async (req, res) => {
    
    try {
        const { description, url, req_method, req_body, req_headers, project  } = req.body

        let curr_url = await Url.findOne({url: url})
        
        if(curr_url){
            return res.status(400).send({
                success: true,
                msg: 'Url already in use'
            })
        }

        curr_url = new Url({
            description, 
            url, 
            req_method, 
            req_body, 
            req_headers, 
            project
        });

        await curr_url.save();
        return res.send({
            success: true,
            msg: 'Successfully registered Url',
            data: curr_url
        });
    }
    catch (error) {
        console.error(error.message);
        return res.status(400).send({
            success: false,
            msg: 'Could not register Url',
        });
    }
})

router.delete("/:id", async (req, res) => {
    try {
        let data = await Url.findById(req.params.id).lean();
        if (!data) return res.status(404).send({
            success: false,
            msg: 'data not found'
        });

        data = await Url.findByIdAndDelete(req.params.id);
        return res.status(200).send({ 
            success: true, 
            msg:'Successfully deleted Url',
            data
        });
    } catch (error) {
        console.error(error.message);
        return res.status(400).send({
            success: false,
            msg: 'Could not delete item'
        });
    }
})  

module.exports= router








