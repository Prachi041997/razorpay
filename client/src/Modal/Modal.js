import React from 'react';
import './Modal.css';
const Modal = ({show, amount, TId, hideModal})=> {
    console.log(amount);
    const classname = show? 'modal block': 'modal none'
   return (
       <div className={classname}>
           <div className='mainModal'>
               <div className='logo' onClick={hideModal}><i className="ri-close-fill"></i></div>
               <h1>Thank you!</h1>
               <div id='row1'>
                   <div id='name'>Amount</div>
                   <div id='value'>INR &nbsp;{amount} </div>
               </div>
               <div id='row1'>
                   <div id='name'>Transaction Id</div>
   <div id='value'>{TId}</div>
               </div>
           </div>
       </div>
   )
}
export default Modal;