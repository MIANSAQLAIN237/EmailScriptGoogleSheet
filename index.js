const express = require("express");
const app = express();
var path = require("path");
const nodemailer = require("nodemailer");
const reader = require("xlsx");
var moment = require("moment");
var pdfDocument = require("pdfkit");
const fs = require("fs").promises;
const { createWriteStream } = require("fs");
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
const PORT = process.env.PORT || 53000;
const excel = require("exceljs");
const { list } = require("pdfkit");
const Sheets = require("node-sheets").default;
app.listen(PORT, () => console.log(`Server is runing on this port ${PORT}`));

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// app.use("/uploads", express.static(path.join(__dirname, "Uploads")));

// app.use("/api", apiUrl);
async function imagetopdff() {
  doc = new PDFDocument();
  //Pipe its output somewhere, like to a file or HTTP response
  //See below for browser usage
  doc.pipe(createWriteStream("./invoice.pdf"));
  //Add an image, constrain it to a given size, and center it vertically and horizontally
  doc.image("./public/picture.png", {
    fit: [1000, 600],
    // align: "center",
    valign: "center",
  });
  // doc.addPage().image("./image.png", {
  //   fit: [500, 400],
  //   align: "center",
  //   valign: "center",
  // });
  doc.end();
}
// function apiCallFunctionGmail(req, res) {
async function apiCallFunctionGmail(req, res) {
  var senderemaillist = [];
  var senderpasswordlist = [];
  var receiveremaillist = [];
  var bodylist = [];
  var subjectlist = [];
  var sendernamelist = [];
  const gs = new Sheets("1dAEx3icX1AMhCKYcQnGYKynW9bApdo-Ghh7IqZNR3sQ"); //SpreadSheet ID
  await gs.authorizeApiKey("AIzaSyC6QFxd-uZKtL0b3-k2mNOtdvpLNyTEoUg"); // API KEY
  const senderemail = await gs.tables("A1:A50");
  const senderpassword = await gs.tables("B1:B50");
  const receiveremail = await gs.tables("E1:E1000");
  const bodydata = await gs.tables("G1:G1000");
  const subjectdata = await gs.tables("K1:K1000");
  const sendername = await gs.tables("I1:I1000");
  // console.log(table.headers);
  // console.log(JSON.stringify(table.rows));
  senderemail.rows.map((data, index) => {
    senderemaillist.push({
      senderemail: data.email.value,
    });
  });
  senderpassword.rows.map((data, index) => {
    senderpasswordlist.push({
      senderpassword: data.password.value,
    });
  });
  receiveremail.rows.map((data, index) => {
    receiveremaillist.push({
      receiveremail: data.receiver.value,
    });
  });
  bodydata.rows.map((data, index) => {
    bodylist.push({
      bodydata: data.body.value,
    });
  });
  subjectdata.rows.map((data, index) => {
    subjectlist.push({
      subjectdata: data.subject.value,
    });
  });
  sendername.rows.map((data, index) => {
    sendernamelist.push({
      sendername: data.name.value,
    });
  });
  // console.log("senderemail", senderemaillist.length);
  // console.log("senderpasswordlist", senderpasswordlist.length);
  // console.log("receiveremaillist", receiveremaillist.length);
  // console.log("bodylist", bodylist.length);
  // console.log("subjectlist", subjectlist.length);
  // console.log("sendernamelist", sendernamelist.length);
  // console.log("body", body.length);
  // console.log("list", list);
  // console.log("table", table.rows.length);
  let send = [];
  let emails = [];
  for (i = 0; i < senderemaillist.length; i++) {
    var elesenderemail = senderemaillist[i]?.senderemail;
    var elepassword = senderpasswordlist[i]?.senderpassword;
    if (elesenderemail && elepassword) {
      var transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: elesenderemail,
          pass: elepassword,
        },
      }); // transport End"
      await new Promise(async (resolve, reject) => {
        transport.verify(async function (error, success) {
          console.log({ error, success });
          if (!error)
            send.push({
              password: elepassword,
              email: elesenderemail,
              // name: ele[colMapping.name] || "",
              // subject: ele[colMapping.subject] || "",
              // body: ele[colMapping.body] || "",
              transport,
            });
          resolve();
        });
      });
    }
  }
  console.log("send", send.length);
  for (i = 0; i < receiveremaillist.length; i++) {
    var elereceiverdata = receiveremaillist[i]?.receiveremail;
    var bodylistdata = bodylist[i]?.bodydata;
    var subjectlistdata = subjectlist[i]?.subjectdata;
    var sendernamelistdata = sendernamelist[i]?.sendername;
    if (
      elereceiverdata &&
      bodylistdata &&
      subjectlistdata &&
      sendernamelistdata
    ) {
      emails.push({
        receiver: elereceiverdata,
        body: bodylistdata,
        subject: subjectlistdata,
        name: sendernamelistdata,
      });
    }
  }
  // yaha tk ho gya
  // console.log("emails", emails);
  if (!send.length) throw new Error();
  let pointer = -1;
  let maxPointerValue = send.length - 1;
  console.log("maxPointerValue", maxPointerValue);
  for (let idx = 0; idx < emails.length; idx++) {
    const emailsend = emails[idx];
    await nodeHtmlToImage(htmlData).then(() =>
      console.log("The image was created successfully!")
    );
    await imagetopdff();
    // await nodeHtmlToImage({
    //   output: "./public/picture.png",
    //   html: `<html><body><h1>${idx + 1} dsfsdf</body</html>`,
    // }).then(() => console.log("The image was created successfully!"));
    pointer = pointer + 1;
    // console.log("pointer", pointer);
    // console.log("send[pointer].email", send[pointer].email);
    var info = await send[pointer].transport.sendMail({
      from: `"${emailsend.name}"` + send[pointer].email, // sender address
      to: emailsend.receiver,
      subject: emailsend.subject, // Subject line
      text: emailsend.body + " " + "mlrch-845f98c",
      // html: ' mlrch-7fd607 <img src="https://backend11q.herokuapp.com/picture.png"/>',
      attachments: [
        {
          // encoded string as an attachment
          filename: emailsend.receiver + ".pdf",
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
    // console.log("email", email);
    console.log("info", info);
    console.log("Server is ready to take our messages");
    // console.log({ pointer, maxPointerValue });
    if (pointer == maxPointerValue) pointer = -1;
  }
  // }); // url link
  // res.json({
  //   msg: "send apiCallFunctionGmail2 Data Complete",
  //   success: true,
  // });
}
apiCallFunctionGmail();

module.exports = app;
