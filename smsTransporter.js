
require('dotenv').config();
var TeleSignSDK = require('telesignsdk');

var client =new TeleSignSDK(process.env.TELE_ID,process.env.TELE_APIKEY,process.env.TELE_REST_ENDPOINT);

module.exports = client;  