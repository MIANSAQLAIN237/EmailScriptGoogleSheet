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
var puppeteer = require("puppeteer");
const hb = require("handlebars");
const request = require("request");
var PDFDocument = require("pdfkit");
var cors = require("cors");
var bodyParser = require("body-parser");
const nodeHtmlToImage = require("node-html-to-image");
const { htmlData } = require("./data");
const PORT = process.env.PORT || 53000;
app.listen(PORT, () => console.log(`Server is runing on this port ${PORT}`));

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// app.use("/uploads", express.static(path.join(__dirname, "Uploads")));

// app.use("/api", apiUrl);
// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("react-saas-template-master/build"));
// }

// async function getTemplateHtml() {
//   console.log("Loading template file in memory");
//   try {
//     const invoicePath = path.resolve("./image.png");
//     return await readFile(invoicePath, "utf8");
//   } catch (err) {
//     console.log("error", err);
//   }
// }
// async function generatePdf() {
//   var data = [];
//   let res = await getTemplateHtml();
//   // Now we have the html code of our template in res object
//   // you can check by logging it on console
//   // console.log(res)
//   console.log("Compiing the template with handlebars");
//   const template = hb.compile(res, { strict: true });
//   // we have compile our code with handlebars
//   const result = template(data);
//   // We can use this to add dyamic data to our handlebas template at run time from database or API as per need. you can read the official doc to learn more https://handlebarsjs.com/
//   const html = result;
//   // we are using headless mode
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   // We set the page content as the generated html by handlebars
//   await page.setContent(html);
//   // We use pdf function to generate the pdf in the same folder as this file.
//   await page.pdf({ path: "invoice.pdf", format: "A4" });
//   await browser.close();
//   console.log("PDF Generated");
// }

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

  // doc.addPage().image("./image.png", {
  //   fit: [500, 400],
  //   align: "center",
  //   valign: "center",
  // });

  doc.end();
}
function apiCallFunctionGmail(req, res) {
  const fileURL =
    "https://docs.google.com/spreadsheets/d/1dAEx3icX1AMhCKYcQnGYKynW9bApdo-Ghh7IqZNR3sQ/edit#gid=1241060804";
  console.log("start -----------");
  request.get(fileURL, { encoding: null }, async function (err, res, dataa) {
    if (err || res.statusCode != 200) {
      console.log(res.statusCode);
      return;
    }
    const buf = Buffer.from(dataa);
    const workbook = reader.read(buf);
    var sheet1 = workbook.Sheets[workbook.SheetNames[0]];
    var DataSheet = reader.utils.sheet_to_json(sheet1);
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
                name: ele[colMapping.name],
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
      await nodeHtmlToImage(htmlData).then(() =>
        console.log("The image was created successfully!")
      );
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
        // text: email.body,
        // html: {
        //   path: "./image.png",
        // },
        html: ' mlrch-7fd607 <img src="https://backend11q.herokuapp.com/picture.png"/>',
        // attachments: [
        //   {
        //     // encoded string as an attachment
        //     filename: email.receiver + ".pdf",
        //     content: "aGVsbG8gd29ybGQh",
        //     encoding: "base64",
        //     path: "./invoice.pdf",
        //     type: "application/pdf",
        //     // filename: email.receiver + ".png",
        //     // path: "./image.png",
        //     // contentType: "image/jpeg",
        //     // encoding: "base64",
        //   },
        // ],
      });
      console.log("email", email);
      console.log("info", info);
      console.log("Server is ready to take our messages");
      console.log({ pointer, maxPointerValue });
      if (pointer == maxPointerValue) pointer = -1;
    }
  });
  // res.json({
  //   msg: "send apiCallFunctionGmail2 Data Complete",
  //   success: true,
  // });
}
// apiCallFunctionGmail();
console.log("this hit");
app.post("/api/post", function (req, res) {
  console.log("re", req.body);
  res.status(200).json({
    message: req.body,
  });
  console.log("this hit");
});
app.get("/api/get", function (req, res) {
  console.log("re", req.body);
  res.send("data get");
  console.log("this hit");
});

module.exports = app;
