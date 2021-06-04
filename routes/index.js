var express = require('express');
var router = express.Router();
require('dotenv').config()
const Razorpay = require('razorpay');
const sendMail = require('../services/mailgun.js');

router.get('/', function (req, res, next) {
  var instance = new Razorpay({
    key_id: process.env.Razor_KeyID,
    key_secret: process.env.Razor_KeySecret
  });
  instance.orders.create({
    amount: 25000,
    currency: "INR",
    receipt: "rcptid_11",
    payment_capture: "1"
  }).then(orders => {
    res.render('index.html', { key_id: process.env.KeyID, order_id: orders.id, amount: orders.amount });
  }).catch(e => console.log(e));
});


router.post('/success', async function (req, res, next) {
  const data = JSON.parse(JSON.stringify(req.body));
  try {
    await sendMail(data);
  }catch(err){
    console.log(err)
  }
  next();
}, function (req, res) {
  res.render('success.html');
});
module.exports = router;
