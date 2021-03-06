/* Sends an email to the specified email address.
   Adapted from https://sendgrid.com/blog/send-email-static-websites-using-parse/
   Make sure you have a config file with your Sendgrid username and password:
   module.exports = {
      sendgrid: {
        username: YOUR_USERNAME,
        password: YOUR_PASSWORD
      }
   }
*/
var RECEIVER = 'lily@nguyensomniac.com';
var config = require('cloud/config.js');
Parse.Cloud.define('sendEmail', function(request, response) {
  //create request object
  var email = request.params.email;
  var subject = request.params.subject;
  var body = request.params.body;
  var emailParams = {
    to: RECEIVER,
    from: email,
    subject: subject,
    text: body
  };

  //initialize SendGrid
  var sendgrid = require('sendgrid');
  sendgrid.initialize(config.sendgrid.username, config.sendgrid.password);
  //send request
  sendgrid.sendEmail(emailParams, {
    success: function(res)  {
      response.success('Sent!');
    },
    error: function(res)  {
      response.error('Something went wrong.');
    }
  });
});
