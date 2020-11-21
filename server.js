const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const razorPay = require('razorpay');
const request = require('request');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = require('./user');

const app = express();

mongoose.connect('mongodb+srv://prachi:prachi123@prachi-324ca.mongodb.net/RazorPay?retryWrites=true&w=majority', {useNewUrlParser:true})
.then(()=>console.log('database connected'))
.catch(err=> console.log(err));
// const instance = new razorPay({
//     key_id: 'rzp_live_vNCHhW0SAxA8lU',
//     key_secret: '9CUx5IYORbpqhJIDt6doek3L',
// });
const instance = new razorPay({
    key_id: 'rzp_live_zPcY1kMcZJ7sob',
    key_secret: 'pkkvx4xhGFhvmezNcejhPmYX',
});

app.use(cors());
app.use(bodyParser.json());

app.post('/verification', (req, res)=> {
    const SECRET = '12345';
    console.log(req.body);
    console.log(req.body.payload.payment.entity)
    const hmac = crypto.createHmac('sha256', SECRET);
    hmac.update(JSON.stringify(req.body));
    const digest = hmac.digest('hex');
    console.log(digest, req.headers['x-razorpay-signature']);
    if(digest == req.headers['x-razorpay-signature'] )
   {
    User.create({
        email: req.body.payload.payment.entity.email,
        contact:req.body.payload.payment.entity.contact,
        transactionId: req.body.payload.payment.entity.id,
        orderId: req.body.payload.payment.entity.order_id,
        amount: req.body.payload.payment.entity.amount
    });
       return res.json({status:'ok'})
   }
   else {}
    
})

app.post('/api/postAmount', (req, res)=> {
    console.log(req.body);
    console.log(parseInt(req.body.amount, 10));
    var options = {
        amount: parseInt(req.body.amount*100, 10),  // amount in the smallest currency unit
        currency: "INR",
        receipt: "Receipt#1",
        payment_capture: '0'
      };
      instance.orders.create(options, function(err, order) {
        console.log(err);
      console.log(order);
      if(err) {
          return res.status(400).send({
              error: 'Something went wrong'
          })
      }
      return res.json({
          response: order
      })
    });
})
app.get('/order', (req, res)=> {
    var options = {
        amount: 300,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "Receipt#1",
        payment_capture: '0'
      };
      instance.orders.create(options, function(err, order) {
          console.log(err);
        console.log(order);
        if(err) {
            return res.status(400).send({
                error: err
            })
        }
        return res.json({
            response: order
        })
      });
})
// app.post("/capture/:paymentId", (req, res) => {
//     console.log(req.params.paymentId);
//     try {
//       return request(
//        {
//        method: "POST",
//        url: `https://rzp_live_zPcY1kMcZJ7sob:TTqmu8RGnf8Hbdi8KiGdXltG@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
//        form: {
//           amount: 300, // amount == Rs 10 // Same As Order amount
//           currency: "INR",
//         },
//       },
//      async function (err, response, body) {
//          console.log(body);
//        if (err) {
//         return res.status(500).json({
//            message: "Something Went Wrong",
//          }); 
//        }
//         console.log("Status:", response.statusCode);
//         console.log("Headers:", JSON.stringify(response.headers));
//         console.log("Response:", body);
//         return res.status(200).json(body);
//       });
//     } catch (err) {
//       return res.status(500).json({
//         message: "Something Went Wrong",
//      });
//     }
//   });

const PORT = process.env.PORT || 2500;
if(process.env.NODE_ENV === 'production' ||  process.env.NODE_ENV === 'staging'){
  app.use(express.static('client/build'))

  app.get('*', (req, res)=> {
      res.sendFile(path.join(__dirname + '/client/build/index.html'));
  })
}
app.listen(PORT, ()=> {
    console.log('app running on port 2500');
})
