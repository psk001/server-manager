const express= require('express')
const router= express.Router()
const axios= require('axios')

const { Project } = require('../models/project')


router.get("/", async (req, res)=> {
    try{
        const project= await Project.find().lean()
        return res.status(200).send({
            success: true,
            msg: 'Successfully fetched data',
            data: project
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
        const project= await Project.findById(req.params.id).lean()

        if (!project) {
            return res.status(404).send({
                success: false,
                msg: 'Data not found'
            })
        }

        return res.status(200).send({
            success: true,
            msg: 'Successfully fetched data',
            data: project
        })
    }
    catch(err){
        return res.status(400).send({
            success: false,
            msg: 'Could not fetch data'
        })
    }
})


router.delete("/:id", async (req, res) => {
    try {
        let data = await User.findById(req.params.id).lean();
        if (!data) return res.status(404).send({
            success: false,
            msg: 'data not found'
        });

        data = await User.findByIdAndDelete(req.params.id);
        return res.status(200).send({ 
            success: true, 
            msg:'Successfully deleted user',
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








