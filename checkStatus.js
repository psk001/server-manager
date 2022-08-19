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

        console.log('urls: ', urls);

        for(let link of urls){
            console.log('current url: ', link)
            const urlData= await Url.findById(link).lean()

            console.log('cirrent url data: ', urlData)
            const {url, req_method, req_headers}= urlData

            const config= {
                req_method,
                url,
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
    // console.log('running every minute .... always and forever.... !');
    testServer()
});

module.exports= checkStatus