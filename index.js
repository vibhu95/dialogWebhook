"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
var ejs = require('ejs');
var fs = require('fs');

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/vhic/send/mail/",function(req,res){
  var transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
      user: 'vibhutinarayan95@yahoo.com',
      pass: 'pu13/395'
    }
  });
  
  var receiver = req.body.mail || "amit00978@gmail.com";
  var data = req.body.data || "";

  var htmlContent = fs.readFileSync(__dirname + '/vhicmail.ejs', 'utf8');

  var entries = [];
  console.log(data);
  Object.keys(data).forEach(function(key){
    console.log(key);
    var json = {
        question:key,
        answer:data[key]
    };
    entries.push(json);
  });
  console.log(entries);
  var htmlRenderized = ejs.render(htmlContent, {filename: 'vhicmail.ejs', entries: entries});
  console.log(htmlRenderized);

  var mailOptions = {
    from: 'vibhutinarayan95@yahoo.com',
    to: receiver,
    subject: 'Filled data',
    html: htmlRenderized
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  return res.json({
    message:"message has been sent !!",
    status:true
  });
});


restService.get("/send",function(req,res){
  var transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
      user: 'vibhutinarayan95@yahoo.com',
      pass: 'pu13/395'
    }
  });
  
  var mailOptions = {
    from: 'vibhutinarayan95@yahoo.com',
    to: 'vibhutinarayan995@gmail.com',
    subject: 'Hello from jarvis!!',
    text: "testing"
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  return res.json({
    status:"message has been sent !!"
  });
});

restService.get("/send/yahoo",function(req,res){
  var transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
      user: 'vibhutinarayan95@yahoo.com',
      pass: 'pu13/395'
    }
  });
  
  var mailOptions = {
    from: 'vibhutinarayan95@yahoo.com',
    to: 'vibhutinarayan95@yahoo.com',
    subject: 'Hello from jarvis!!',
    text: "testing"
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  return res.json({
    status:"message has been sent !!"
  });
});

restService.post("/echo", function(req, res) {
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
      ? req.body.result.parameters.echoText
      : "Seems like some problem. Speak again.";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

restService.post("/echoV2", function(req, res) {
  var speech = "";
  if(req.body.queryResult && req.body.queryResult.parameters)
  {
    if(req.body.queryResult.parameters.echoText)
      speech = req.body.queryResult.parameters.echoText+" ";
    if(req.body.queryResult.parameters.device)
      speech +=req.body.queryResult.parameters.device+" "; 
    if(req.body.queryResult.parameters.status)
      speech +=req.body.queryResult.parameters.status;
    
  }else{
      speech = "Seems like some problem. Speak again.";
  }
      
  console.log(speech);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hackbug00978@gmail.com',
      pass: 'hackbug@12345,.'
    }
  });
  
  var mailOptions = {
    from: 'hackbug00978@gmail.com',
    to: 'vibhutinarayan995@gmail.com',
    subject: 'Hello from jarvis!!',
    text: speech
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  return res.json({
    fulfillmentText: speech,
    fulfillmentMessages: [
      {
        "text": {
          "text": [
            speech
          ]
        }
      }
    ],
    source: "webhook-echo-sample"
  });
});

console.log('TEMP_KEY ::: ',process.env.TEMP_KEY);

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
