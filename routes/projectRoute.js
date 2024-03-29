const express= require('express')
const router= express.Router()

const { Project } = require('../models/project')
const auth= require('../middlewares/auth')


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

router.post("/", auth, async (req, res) => {
    
    try {
        const { name, description, url } = req.body

        let project = await Project.findOne({url: url})
        
        if(project){
            return res.status(400).send({
                success: true,
                msg: 'Email already in use'
            })
        }

        const passwordHash = bcrypt.hashSync(password, 5);

        user = new Project({
            name, description, url, user_id: req.user._id
        });

        await project.save();
        return res.send({
            success: true,
            msg: 'Successfully registered project',
            data: project
        });
    }
    catch (error) {
        console.error(error.message);
        return res.status(400).send({
            success: false,
            msg: 'Could not register project',
        });
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








