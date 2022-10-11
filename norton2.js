exports.norton2 = {
  output: "./public/picture.png",
  html: `<html>
  <head>
      <title>
  </title>
      <style>
          body{margin-top:5%;}
      </style>
          </head>
          <body>
              <script>
                  const event = new Date();
// console.log(event.toString());
                  function between(min, max) {
                       return Math.floor(Math.random() * (max - min) + min);
                     }
                     var Outgoing = between(450, 500);
                     var valuegetpoint = between(50.9, 98.9);
                     var timeperiod = between(1,5);
                     var valueget = Outgoing + "." + valuegetpoint;
                     var ServiceFeee = between(2.1, 5.4);
                     var ServiceFee = ServiceFeee + "." + valuegetpoint;
                     var total = Outgoing + ServiceFeee;
                 
                     // to gerate a randome rounded number between 1 to 10;
                     var theRandomNumber =
                       Math.floor(Math.random() * 10000000000) + valuegetpoint;
                     var numberid = Math.floor(Math.random() * 1000000) + valuegetpoint;
                     </script>
          <div bgcolor="#f6f6f6" style="color: #333; height: 100%; width: 100%;" height="100%" width="100%">
              <table bgcolor="#f6f6f6" cellspacing="0" style="border-collapse: collapse; padding: 40px; width: 100%;" width="100%">
                  <tbody>
                      <tr>
                          <td width="5px" style="padding: 0;"></td>
                          <td style="clear: both; display: block; margin: 0 auto; max-width: 600px; padding: 10px 0;">
                              <table width="100%" cellspacing="0" style="border-collapse: collapse;">
                                  <tbody>
                                      <tr>
                                          <td style="padding: 0;">
                                              <a
                                                  href="#"
                                                  style="color: #348eda;"
                                                  target="_blank"
                                              >
<img src="data:image/png;base64,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" 
alt="Anti-Virus Services"
style="height: 50px; max-width: 100%; width: 157px;"
height="50"
width="157" />
                                              </a>
                                          </td>
                                          <td style="color: #999; font-size: 12px; padding: 0; text-align: right;" align="right">
												N0RTON SERVICES<br />
                                              INVOICE: # <script>
                                                  document.write(theRandomNumber);
                                          </script>
                                                    <br />
                                                    Date:
                                                    <script>
                                              document.write(event.toDateString());
                                                    </script>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </td>
                      </tr>
                      <tr>
                          <td width="5px" style="padding: 0;"></td>
                          <td bgcolor="#FFFFFF" style="border: 1px solid #000; clear: both; display: block; margin: 0 auto; max-width: 600px; padding: 0;">
                              <table width="100%" style="background: #f9f9f9; border-bottom: 1px solid #eee; border-collapse: collapse; color: #999;">
                                  <tbody>
                                      <tr>
                                          <td width="50%" style="padding: 20px;"><strong style="color: #333; font-size: 24px;"><script>document.write("$",valueget)</script></strong> Paid</td>
                                          <td align="right" width="50%" style="padding: 20px;color:red;font-size: 18px;">Support:+1(205) 456-0050</td>
                                      </tr>
                                  </tbody>
                              </table>
                          </td>
                          <td style="padding: 0;"></td>
                          <td width="5px" style="padding: 0;"></td>
                      </tr>
                      <tr>
                          <td width="5px" style="padding: 0;"></td>
                          <td style="border: 1px solid #000; border-top: 0; clear: both; display: block; margin: 0 auto; max-width: 600px; padding: 0;">
                              <table cellspacing="0" style="border-collapse: collapse; border-left: 1px solid #000; margin: 0 auto; max-width: 600px;">
                                  <tbody>
                                      <tr>
                                          <td valign="top"  style="padding: 20px;">
                                              <h3
                                                  style="
                                                      border-bottom: 1px solid #000;
                                                      color: #000;
                                                      font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
                                                      font-size: 18px;
                                                      font-weight: bold;
                                                      line-height: 1.2;
                                                      margin: 0;
                                                      margin-bottom: 15px;
                                                      padding-bottom: 5px;
                                                  "
                                              >
                                                  Summary
                                              </h3>
                                              <table cellspacing="0" style="border-collapse: collapse; margin-bottom: 40px;">
                                                  <tbody>
                                                      <tr>
                                                          <td style="padding: 5px 0;">Old Pan</td>
                                                          <td align="right" style="padding: 5px 0;">Free plan <script>document.write(timeperiod, "/month")</script>
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td style="padding: 5px 0;">Subscription</td>
                                                          <td align="right" style="padding: 5px 0;">N0RT0N ANTI-VIRUS</td>
                                                      </tr>
                                                      <tr>
                                                          <td style="padding: 5px 0;">Billing Plan</td>
                                                          <td align="right" style="padding: 5px 0;"><script>document.write(timeperiod, "/Years")</script></td>
                                                      </tr>
                                                      <tr>
                                                          <td style="padding: 5px 0;">Subscription Amount</td>
                                                          <td align="right" style="padding: 5px 0;"> <script>document.write("$",valueget)</script></td>
                                                      </tr>
                                                      <tr>
                                                          <td style="padding: 5px 0;">Tax Amount</td>
                                                          <td align="right" style="padding: 5px 0;"> <script>document.write("$",ServiceFeee)</script></td>
                                                      </tr>
                                                      <tr>
                                                          <td style="border-bottom: 2px solid #000; border-top: 2px solid #000; font-weight: bold; padding: 5px 0;">Amount paid</td>
                                                          <td align="right" style="border-bottom: 2px solid #000; border-top: 2px solid #000; font-weight: bold; padding: 5px 0;"><script>document.write("Total:$",total)</script></td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </td>
                          </tr>
                          </tbody>
                          </table>
                          <h4>Dear Customer,</h4>
                          <p>Thank you so much for your order. We are getting everything ready to send you product Slip and login crediationals in your email and will let you know as soon as possible.If you would like to Return Product.Please Contact US on the Helpline.We’d be happy to help.</p>
          </div>
      </body>
  
</html>
`,
};
