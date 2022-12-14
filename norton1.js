exports.norton1 = {
  output: "./public/picture.png",
  html: `<!doctype html>
    <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <title>Confirmation</title>
    <style>
        :root {
        --body-bg: rgb(204, 204, 204);
        --white:  #ffffff;
        --darkWhite: #ccc;
        --black: #615c60;
        --themecolor: #22b8d1;
        --pageShadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
    }
    body {
        background-color: var(--body-bg);
    }
    .page {
        background: var(--white);
        display: block;
        margin: 0 auto;
        position: relative;
        box-shadow: var(--pageShadow);
    }
    .header img{
            height: 220px;
    }
    .bottom p {
        background-color: #eff1f2;
        padding-top: 10px;
        padding-bottom: 10px;
        margin-top: 130px;
    }
    </style>
        </head>
        <body>
        <script>
            function between(min, max) {
                    return Math.floor(Math.random() * (max - min) + min);
                }
					const event = new Date();
            //    var time = event.getHours() + ":" + event.getMinutes() + ":" + event.getSeconds();
            function formatAMPM(date) {
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var seconds = date.getSeconds();
                var ampm = hours >= 12 ? "pm" : "am";
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                var strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
                return strTime;
              }
                var Outgoing = between(450, 500);
                var valuegetpoint = between(50.9, 98.9);
                var timeperiod = between(1,2);
                var valueget = Outgoing + "." + valuegetpoint;
                var ServiceFeee = between(2.1, 5.9);
                var ServiceFee = ServiceFeee + "." + valuegetpoint;
                var total = Outgoing + ServiceFeee;
                var theRandomNumber =
                    Math.floor(Math.random() * 10000000000) + valuegetpoint;
                var numberid = Math.floor(Math.random() * 1000000) + valuegetpoint;
                </script>
            <div class="my-5 page" size="A4">
                <div class="p-5">
                <div class="header">
                    <div class="row">
                            <img src="https://www.cnet.com/a/img/resize/e961ca093b7b703fb2ea6b6bf69bc21f8d9ffa69/hub/2020/12/21/a551a010-93fe-47b8-8dd6-6689f716966b/norton-secure-vpn.png?auto=webp&fit=crop&height=630&width=1200" alt="">
                    </div>
                </div>
                <br>
                <div class="body">
                    <div class="row">
                        <div class="col-12">
                            <div class="third-col" >
                            <h6 style="font-weight: bold;"> Order Number :<script>
                                document.write(theRandomNumber);
                                </script>   
                                <br> Date:  <script>
                                document.write(event.toDateString());
                                      </script>
                                      <br/>
                                      Time: <script>
                                      document.write(formatAMPM(event));
                                      </script>
                                <br>Amount:<script>document.write("$",Outgoing)</script>
                                <br>Payment Module: Auto-Debit
                            </h6>
                            </div>
                        </div>
                        </div>
                </div>
                <br> <br>
                <h5 style="text-align: center;background-color: rgb(17, 110, 224);color: white;font-size: large;padding-top: 5px;padding-bottom: 5px;">N0RTON Advanced Threat Protection Fire-Wall & Network Protection
                </h5>
                <br>
                <h6>Dear Customer,</h6>
                <br>
                <h6>Thanks for using N0RTON Advanced Threat Protection.This is an invoice for
                    your recent purchase.</h6>
                    <br>
                    <h6>We thank you on the Completion of your <script>document.write(timeperiod)</script>
                    <span>year.</span></h6>  
                        <h6> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If you have any questions about this invoice, simply reach out to our support team at +1 (855) 484-1792 (Toll Free) for assistance.
                            <br> <br>
                            You have 24 hours to refund this charge from the date of the transaction without being
                            charged.Pleas Contact with us as you receive the Invoice.Our Support team will gladly assist you with any Questions or Requests.
                            <br><br>
                            <p style="text-align: center;"><b>Please don't reply to this email. To get in touch with US at Contact: +1 (855) 484-1792</b></p>
                                <p style="text-align: center;"><span style="font-weight: bolder;">N0RTON SECURITY <br></span> <br> <span>The N0RTON Security app provides an easy glance of your device's performance. The dashboard highlights any issues
                                    with Storage,Battery Life, Apps and Software.</span> </p>                         
                                    <p>You have 24 hours to refund this charge from the date of the transaction without being any Subscription charges.</p>
                                <script>
                                    document.write("Receipt Number: ", numberid)
                                </script> 
                </div>
            </div>
        </body>
    </html>`,
};
