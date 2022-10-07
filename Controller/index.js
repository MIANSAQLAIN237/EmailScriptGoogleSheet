const express = require("express");
const app = express();
var path = require("path");
const nodemailer = require("nodemailer");
const reader = require("xlsx");
var moment = require("moment");
var pdfDocument = require("pdfkit");
const fs = require("fs");
const utils = require("util");
const readFile = utils.promisify(fs.readFile);
// var puppeteer = require("puppeteer");
const hb = require("handlebars");
const request = require("request");
var PDFDocument = require("pdfkit");
var cors = require("cors");
var bodyParser = require("body-parser");
const nodeHtmlToImage = require("node-html-to-image");
const { htmlData } = require("./data");

async function imagetopdff() {
  doc = new PDFDocument();
  //Pipe its output somewhere, like to a file or HTTP response
  //See below for browser usage
  doc.pipe(fs.createWriteStream("./invoice.pdf"));
  //Add an image, constrain it to a given size, and center it vertically and horizontally
  doc.image("./public/picture.png", {
    fit: [1000, 600],
    // align: "center",
    valign: "center",
  });

  doc.end();
}
// function apiCallFunctionGmail(req, res) {
const apiCallFunctionGmail = (req, res) => {
  const fileURL =
    "https://docs.google.com/spreadsheets/d/1dAEx3icX1AMhCKYcQnGYKynW9bApdo-Ghh7IqZNR3sQ/edit#gid=1241060804";
  console.log("start -----------");
  request.get(fileURL, { encoding: null }, async function (err, res, dataa) {
    if (err || res.statusCode != 200) {
      console.log("File not found");
      return;
    }
    for (i = 0; i < 8; i++) {
      nodeHtmlToImage({
        output: "./public/picture.png",
        html: `<html><body><h1>${i + 1} dsfsdf</body</html>`,
      }).then(() => console.log("The image was created successfully!"));
    }
    const buf = Buffer.from(dataa);
    const workbook = reader.read(buf);
    var sheet1 = workbook.Sheets[workbook.SheetNames[0]];
    var DataSheet = reader.utils.sheet_to_json(sheet1);
    return;
    let colMapping = {
      email: "A",
      password: "B",
      receiver: "E",
      body: "G",
      name: "I",
      subject: "K",
    };
    let send = [];
    let emails = [];
    for (i = 1; i < DataSheet.length; i++) {
      let ele = DataSheet[i];
      if (ele[colMapping.email] && ele[colMapping.password]) {
        var transport = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          auth: {
            user: ele[colMapping.email],
            pass: ele[colMapping.password],
          },
        }); // transport End"
        await new Promise(async (resolve, reject) => {
          transport.verify(async function (error, success) {
            console.log({ error, success });
            if (!error)
              send.push({
                password: ele[colMapping.password],
                email: ele[colMapping.email],
                // name: ele[colMapping.name] || "",
                // subject: ele[colMapping.subject] || "",
                // body: ele[colMapping.body] || "",
                transport,
              });
            resolve();
          });
        });
      }
      if (ele[colMapping.receiver] && ele[colMapping.body]) {
        emails.push({
          body: ele[colMapping.body],
          receiver: ele[colMapping.receiver],
          subject: ele[colMapping.subject],
          name: ele[colMapping.name],
        });
      }
    }
    if (!send.length) throw new Error();
    let pointer = -1;
    let maxPointerValue = send.length - 1;
    for (let idx = 0; idx < emails.length; idx++) {
      const email = emails[idx];
      // await generatePdf();
      // await nodeHtmlToImage(htmlData).then(() =>
      //   console.log("The image was created successfully!")
      // );

      // await nodeHtmlToImage({
      //   output: "./public/picture.png",
      //   html: `<html><body><h1>${idx + 1} dsfsdf</body</html>`,
      // }).then(() => console.log("The image was created successfully!"));

      await imagetopdff();
      pointer = pointer + 1;
      console.log("pointer", pointer);
      console.log("send[pointer].email", send[pointer].email);
      // send mail with defined transport object
      // var transport = nodemailer.createTransport({
      //   host: "smtp.gmail.com",
      //   port: 587,
      //   auth: {
      //     user: send[pointer].email,
      //     pass: send[pointer].password,
      //   },
      // }); // transport End"
      var info = await send[pointer].transport.sendMail({
        from: `"${email.name}"` + send[pointer].email, // sender address
        to: email.receiver,
        subject: email.subject, // Subject line
        text: email.body,
        // html: {
        //   path: "./image.png",
        // },
        // html: ' mlrch-7fd607 <img src="https://backend11q.herokuapp.com/picture.png"/>',
        attachments: [
          {
            // encoded string as an attachment
            filename: email.receiver + ".pdf",
            content: "aGVsbG8gd29ybGQh",
            encoding: "base64",
            path: "./invoice.pdf",
            type: "application/pdf",
            // filename: email.receiver + ".png",
            // path: "./image.png",
            // contentType: "image/jpeg",
            // encoding: "base64",
          },
        ],
      });
      console.log("email", email);
      console.log("info", info);
      console.log("Server is ready to take our messages");
      console.log({ pointer, maxPointerValue });
      if (pointer == maxPointerValue) pointer = -1;
    }
  });
  res.json({
    msg: "send apiCallFunctionGmail2 Data Complete",
    success: true,
  });
};

module.exports = apiCallFunctionGmail;
