var client = require("./smsTransporter.js");
var TeleSignSDK = require('telesignsdk');
function SendSMS(phoneNumber, message, messageType){
    
    var messageCallback = function(error, responseBody) {
        if (error === null) {
            console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
                ` => code: ${responseBody['status']['code']}` +
                `, description: ${responseBody['status']['description']}`);
        } else {
            console.error("Unable to send message. " + error);
        }
    }
    client.sms.message(messageCallback, phoneNumber, message, messageType);
}
module.exports = SendSMS;