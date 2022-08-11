const mailjet = require ('node-mailjet')

// env secrets
MAILJET_API_KEY=process.env['MAILJET_API_KEY']
MAILJET_API_SECRET=process.env['MAILJET_API_SECRET']


const sendMailToUser= async ({to, subject, html}) => {
    const client= mailjet.connect(MAILJET_API_KEY,MAILJET_API_SECRET)
    const request = client
        .post("send", {'version': 'v3.1'})
        .request({
            "Messages":[
                {
                "From": {
                    "Email": "puspak9208@gmail.com",  //"dnd@menteezy.com",
                    "Name": "Server Manager"
                },
                "To": [
                    {  
                        "Email": to,            
                    }
                ],
                "Subject": subject,
                "HTMLPart": html,
                "CustomID": `ServerManager-${Date.now().toString()}`
                }
            ]
        })
}

module.exports= sendMailToUser