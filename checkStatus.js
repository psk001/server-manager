const { Project }= require('./models/project')
const { User } = require('./models/user')
const { Url } = require('./models/url')

const axios= require('axios')
const cron = require('node-cron');

const sendMailToUser= require('./utils/sendMailToUser')

const testServer= async () => {
    const projects = await Project.find().populate().lean()

    for(let project of projects){
        const {urls, user_id}= project

        for(let url of urls){
            const urlData= await Url.findById(url)
            const {url, req_method, req_headers}= urlData

            const config= {
                req_method,
                url,
                req_headers
            };

            if(req_method=='PUT' || req_method=='POST'){
                const {req_body}= urlData
                config.payload= req_body
            }

            const response= await axios(config)

            console.log('response: ', response)

            if(response.status==200){
                console.log('project url: ', project_url)
                console.log('status: Active')
            }
            else{
                const {first_name, email}= await User.findById(user_id).lean()
                let subject= `Alert from Server Manager`
                let html= `Hi ${first_name},\n Your app hosted at ${project_url} was down at ${Date.now()} `

                await sendMailToUser(email, subject, html)
            }
        }
    }
}

const checkStatus= async () => {
    console.log('hellooooooo ')
}

cron.schedule('* * * * *', () => {
    console.log('running every minute to 1 from 5');
});

module.exports= checkStatus