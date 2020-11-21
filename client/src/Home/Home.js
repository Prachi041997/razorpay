import React, {useState} from 'react';
import nature from './nature4.jpg';
import axios from 'axios'
import './Home.css';
import Modal from '../Modal/Modal';
const Home = ()=> {
  
    const [amount, setAmount] = useState('');
    const [tId, setTId] = useState('')
    const [show, setShow] = useState(false);
    const [error, setError] = useState('')
    const changeHandle = (e)=> {
        setAmount(e.target.value);
    }
    const showModal = ()=> {
        setShow(true);
    }
    const hideModal = ()=> {
        console.log('Hetuu');
        setShow(false)
        setAmount('')
    }
    const paymentHandler = async (e) => {
        if(amount){
          setError('')
          // const API_URL = 'http://localhost:2500/'
          e.preventDefault();
          const orderUrl = '/api/postAmount';
          const response = await axios.post(orderUrl,{amount: amount});
          const { data } = response;
          console.log(data);
          const options = {
            key: 'rzp_live_zPcY1kMcZJ7sob',
            name: "Donate",
            description: "We are gareeb friends!",
            order_id: data.response.id,
            handler: async (response) => {
              try {
               console.log(response)
               const paymentId = response.razorpay_payment_id;
               console.log(paymentId);
               console.log(response.razorpay_order_id);
               console.log(response.razorpay_signature);
               setTId(paymentId);
               if(response.razorpay_payment_id){
                   showModal();
               }
              
              //  const url = `${API_URL}capture/${paymentId}`;
              //  const captureResponse = await axios.post(url, {})
              //  console.log(captureResponse.data);
              } catch (err) {
                console.log(err);
              }
            }
          };
          const rzp1 = new window.Razorpay(options);
          rzp1.open();
        }
        else{
          setError('Please enter the amount')
        }
        };
   return (
      <React.Fragment>
      <div className='container'>
           {/* <div className='overlay'></div>
           <img src={nature}></img> */}
           <div className='box'>
           
           {error? <p className='error'>{error}</p>: null}
            <div id='inputBox'>
           
               <div id='inr'>INR</div>
               
               <input type='number' placeholder='Donate Amount' onChange={changeHandle}></input>
            </div>
            <button onClick={paymentHandler}>DONATE</button>
           </div>
       </div>
       <Modal show={show} amount={amount} TId={tId} hideModal={hideModal}></Modal>
      </React.Fragment>
   )
}
export default Home;