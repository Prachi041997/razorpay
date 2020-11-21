import React from 'react';

import './App.css';
import axios from 'axios'
const App = ()=> {

  const paymentHandler = async (e) => {
    const API_URL = 'http://localhost:2500/'
    e.preventDefault();
    const orderUrl = `${API_URL}order`;
    const response = await axios.get(orderUrl);
    const { data } = response;
    console.log(data.response.id);
    const options = {
      key: 'rzp_live_ZQszfBaizuDL3j',
      name: "Tshirt",
      description: "Some Description",
      order_id: data.response.id,
      handler: async (response) => {
        try {
          // console.log(response);
         const paymentId = response.razorpay_payment_id;
         console.log(response);
         console.log(response.razorpay_order_id);
         console.log(response.razorpay_signature);
        //  const url = `${API_URL}capture/${paymentId}`;
        //  const captureResponse = await axios.post(url, {})
        //  console.log(captureResponse.data);
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    };
   return <button id="rzp-button1" onClick={paymentHandler}>Pay</button>
}

export default App;
