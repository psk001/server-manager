const express= require('express')
const app= express()

const PORT= process.env.PORT || 5000

require('dotenv').config()

const checkStatus= require('./checkStatus')
const connectToDb= require('./utils/connectToDb')

connectToDb();
checkStatus();

const userRoute= require('./routes/userRoute')
const projectRoute= require('./routes/projectRoute')


app.use('/auth', userRoute)
app.use('api/project', projectRoute)

app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`)
})