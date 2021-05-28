require('dotenv').config();
const DOMAIN = process.env.Mailgun_URL;
const api_key = process.env.Mailgun_key;

async function sendMail(data) {
    const mg = require("mailgun-js")({ apiKey: api_key, domain: DOMAIN });
    const body = 'Payment ID: ' + data.razorpay_payment_id + '\n' +
        'Order id :' + data.razorpay_order_id + '\n' +
        'Thank You for the payment';
    const payload = {
        from: 'chinawalegaurav93@gmail.com',
        to: 'chinawalegaurav93@gmail.com',
        subject: 'Razorpay Payment Successful',
        text: body
    };
    console.log(payload);
    mg.messages().send(payload, function (error, body) {
        console.log(body);
    }).catch(err => console.log(err));
    return
}

module.exports = sendMail;