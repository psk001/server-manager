const { Project }= require('./models/project')
const { User } = require('./models/user')
const axios= require('axios')

const sendMailToUser= require('./utils/sendMailToUser')

const checkStatus= async () => {
    const projects= Project.find().lean()

    for(let project in projects){
        const {project_url, user_id}= project

        const response= await axios.get(project_url);

        if(response.method==200){
            continue
        }
        else{
            const {first_name, email}= await User.findById(user_id).lean()
            let subject= `Alert from Server Manager`
            let html= `Hi ${first_name},\n Your app hosted at ${project_url} was down at ${Date.now()} `

            await sendMailToUser(email, subject, html)
        }
    }

    sleep(60000);
}

module.exports= checkStatus