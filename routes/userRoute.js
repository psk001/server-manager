const express= require('express')
const router= express.Router()
const bcrypt= require('bcrypt')

const { User } = require('../models/user')

router.get("/", async (req, res)=> {
    try{
        const user= await User.find().lean()
        return res.status(200).send({
            success: true,
            msg: 'Successfully fetched data',
            data: user
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
        const user= await User.findById(req.params.id).lean()

        if (!user) {
            return res.status(404).send({
                success: false,
                msg: 'Data not found'
            })
        }

        return res.status(200).send({
            success: true,
            msg: 'Successfully fetched data',
            data: user
        })
    }
    catch(err){
        return res.status(400).send({
            success: false,
            msg: 'Could not fetch data'
        })
    }
})


router.post("/register", async (req, res) => {
    
    try {
        const { name, email, password } = req.body

        let user = await User.findOne({email: email})
        
        if(user){
            return res.status(400).send({
                success: true,
                msg: 'Email already in use'
            })
        }

        const passwordHash = bcrypt.hashSync(password, 5);

        user = new User({
            name, email, password: passwordHash
        });

        await user.save();
        return res.send({
            success: true,
            msg: 'Successfully registered user',
            data: user
        });
    }
    catch (error) {
        console.error(error.message);
        return res.status(400).send({
            success: false,
            msg: 'Could not register user',
        });
    }
})


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        let user = await User.findOne({email: email})
        
        if(! user){
            return res.status(404).send({
                success: true,
                msg: 'User does not exist'
            })
        }

        if(! bcrypt.compareSync(password, user.password)){
            return res.send({
                success: true,
                msg: 'Incorrect email or password'
            })
        }
        
        const token= user.generateAuthToken()

        return res.send({
            success: true,
            msg: 'Successfully logged in',
            token
        });
    }
    catch (error) {
        console.error(error.message);
        return res.status(400).send({
            success: false,
            msg: 'Could not login',
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