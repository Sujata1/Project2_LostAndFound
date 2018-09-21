var transport = require("./emailTransport.js");

function SendEmail(toEmail,subject,emailBody){
  var mailOptions = {
    from: 'lostfound@app.org',
    to: toEmail,
    subject: subject,
    text: emailBody
  };
  
  this.sendMail = transport.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
module.exports = SendEmail;