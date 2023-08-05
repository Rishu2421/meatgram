import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

const CheckoutPage = ({ amount, products }) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const { userId } = useContext(AuthContext);
  const [paymentMethod, setPaymentMethod] = useState('cashOnDelivery');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderError, setOrderError] = useState(null);
  useEffect(() => {
    const razorpaySuccessHandler = (response) => {
      savePaymentDetails(
        response.razorpay_order_id,
        response.razorpay_payment_id,
        response.razorpay_signature
      );
    };

    if (window.Razorpay?.on) {
      window.Razorpay.on('payment.success', razorpaySuccessHandler);
    }

    return () => {
      if (window.Razorpay?.off) {
        window.Razorpay.off('payment.success', razorpaySuccessHandler);
      }
    };
  }, []);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleFormSubmitRazorpay = async (e) => {
    e.preventDefault();

    try {
      // Create the order on the backend and receive the order details
      const { data: { order } } = await axios.post('/api/payment/checkout', { amount });

      const { data: { key } } = await axios.get('http://localhost:3000/api/getkey');

      const options = {
        key,
        amount: order.amount,
        currency: 'INR',
        name: 'MeatGram',
        description: 'Buy Your Product',
        image: '/images/logo.png',
        order_id: order.id,
        callback_url: '/api/payment/paymentverification',
        handler: async (response) => {
          const result = await axios.post('/api/payment/paymentverification', response);
          if (result.status === 200) {
            savePaymentDetails(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature
            );
          }
        },
        prefill: {
          name,
          contact: mobileNumber,
        },
        notes: {
          address,
          products: products.map((item) => ({
            id: item.item._id,
            quantity: item.quantity,
          })),
        },
        theme: {
          color: '#111212',
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();

      // After successful payment, the paymentVerification route in the backend will handle saving the payment details in the database
    } catch (error) {
      console.error(error);
    }
  };

  async function savePaymentDetails(razorpay_order_id, razorpay_payment_id, razorpay_signature) {
    try {
      // Send the payment details to the backend
      const data = {
        name,
        mobileNumber,
        address,
        userId,
        amount,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      };

      const response = await axios.post('/api/payment/savepayment', data);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('token', response.data.token);

      const token = localStorage.getItem('token');
      window.location.href = `/paymentsuccess?reference=${razorpay_payment_id}&token=${token}&userId=${userId}`;
      console.log('Payment details sent to the backend');
    } catch (error) {
      window.location.href = '/paymenterror';
      console.error('An error occurred while sending payment details:', error);
    }
  }

  const handleCashOnDelivery = async (e) => {
    e.preventDefault();
    try {
      // Create the order on the backend without Razorpay details
      console.log("I am executing in handlecashon delivery cheout.jsx+")
      const data = {
        name,
        mobileNumber,
        address,
        userId,
        amount,
      };
      const response = await axios.post('/api/payment/cashondelivery', data);
      if (response.data.success) {
        setOrderPlaced(true);
        setOrderError(null);

        const token = localStorage.getItem('token');
        window.location.href = `/paymentsuccess?reference="Cash On Delivery"&token=${token}&userId=${userId}`;

        // Redirect or show a success message
        console.log('Order confirmed with Cash On Delivery');
      } else {
        setOrderPlaced(false);
        setOrderError('Failed to place the order. Please try again later.');
        console.log('Order placement failed.');
      }
    } catch (error) {
      setOrderPlaced(false);
      setOrderError('An error occurred while processing the order. Please try again later.');
      console.error('An error occurred while processing the order:', error);
      // Handle errors
    }
  };

  // const handleCashOnDelivery = async () => {
  //   try {
  //     // Create the order on the backend without Razorpay details
  //     console.log("I am executing in handlecashon delivery cheout.jsx+")
  //     const data = {
  //       name,
  //       mobileNumber,
  //       address,
  //       userId,
  //       amount,
  //     };
  //     const response = await axios.post('/api/payment/cashondelivery', data);
  //     if(response.success){
  //       <Alert variant="success">"Your Order is placed Successfully Thankyou"</Alert>
        
  //       const token = localStorage.getItem('token');
  //       window.location.href = `/paymentsuccess?reference="Cash On Delivery"}&token=${token}&userId=${userId}`;

  //     }
  //     // ... Save order and other details as needed ...

  //     // Redirect or show a success message
  //     console.log('Order confirmed with Cash On Delivery');
  //   } catch (error) {
  //     console.error(error);
  //     // Handle errors
  //   }
  // };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <h2>Checkout</h2>
          <Form onSubmit={paymentMethod === 'razorpay' ? handleFormSubmitRazorpay : handleCashOnDelivery}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your contact number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>

            <div className="payment-method-box">
              <input
                type="radio"
                id="cashOnDelivery"
                name="paymentMethod"
                value="cashOnDelivery"
                checked={paymentMethod === 'cashOnDelivery'}
                onChange={() => handlePaymentMethodChange('cashOnDelivery')}
              />
              <label htmlFor="cashOnDelivery">Cash On Delivery</label>

              <input
                type="radio"
                id="razorpay"
                name="paymentMethod"
                value="razorpay"
                checked={paymentMethod === 'razorpay'}
                onChange={() => handlePaymentMethodChange('razorpay')}
              />
              <label htmlFor="razorpay">Pay Now with Razorpay</label>
            </div>

            {paymentMethod === 'razorpay' && (
              /* ...Razorpay specific form fields... */
              <Button variant="primary" type="submit">
                Proceed to Pay
              </Button>
            )}

            {paymentMethod === 'cashOnDelivery' && (
              <Button variant="success" type="submit">
                Confirm Order
              </Button>
            )}

            
            {orderPlaced && (
              <Alert variant="success">Your Order is placed Successfully. Thank you!</Alert>
            )}

            {orderError && (
              <Alert variant="danger">Error: {orderError}</Alert>
            )}
          </Form>
        </Col>

        <Col md={6}>
          <h2>Payment Summary</h2>
          {/* Display the amount to be paid */}
          <h3>Amount to be Paid: {amount}</h3>
          {/* Additional payment summary or details */}
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;




// import React, { useState,useEffect,useContext } from 'react';
// import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import axios from 'axios';
// import { AuthContext } from '../../contexts/AuthContext'; 
// const CheckoutPage = ({ amount,products }) => {
//   const [name, setName] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [address, setAddress] = useState('');
//   const { userId } = useContext(AuthContext); // 
//   const [paymentMethod, setPaymentMethod] = useState('cashOnDelivery');
 
//   useEffect(() => {
//     const razorpaySuccessHandler = response => {
//       savePaymentDetails(
//         response.razorpay_order_id,
//         response.razorpay_payment_id,
//         response.razorpay_signature
//       );
//     };

//     if (window.Razorpay?.on) {

//       window.Razorpay.on('payment.success', razorpaySuccessHandler);
//     }

//     return () => {
//       if (window.Razorpay?.off) {
//         window.Razorpay.off('payment.success', razorpaySuccessHandler);
//       }
//     };
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handlePaymentMethodChange = (method) => {
//     setPaymentMethod(method);
//   };



//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Create the order on the backend and receive the order details
//       const { data: { order } } = await axios.post('/api/payment/checkout', { amount });

//       const { data: { key } } = await axios.get('http://localhost:3000/api/getkey');


//       const options = {
//         key,
//         amount: order.amount,
//         currency: 'INR',
//         name: 'MeatGram',
//         description: 'Buy Your Product',
//         image: '/images/logo.png',
//         order_id: order.id,
//         callback_url: '/api/payment/paymentverification',
//         handler: async (response) => {
//          const result=  await axios.post('/api/payment/paymentverification', response);
//          if(result.status===200){
//           savePaymentDetails(
//             response.razorpay_order_id,
//             response.razorpay_payment_id,
//             response.razorpay_signature
//           );
//          }
         
//           },
//         prefill: {
//           name,
//           contact: mobileNumber,
//         },
//         notes: {
//           address,
//           products: products.map((item) => ({
//             id: item.item._id,
//             quantity: item.quantity,
//           })),
//         },
//         theme: {
//           color: '#111212',
//         },
//       };

//       const razor = new window.Razorpay(options);
//       console.log(razor);
//       razor.open();

//       // console.log(razor);
//       // After successful payment, the paymentVerification route in the backend will handle saving the payment details in the database
//     } catch (error) {
//       console.error(error);
//     }
//   };
 

//   async function savePaymentDetails(razorpay_order_id, razorpay_payment_id, razorpay_signature) {
//     try {
//       // Send the payment details to the backend
  
//       const data = {
//         name,
//         mobileNumber,
//         address,
//         userId,
//         amount,
//         razorpay_order_id,
//         razorpay_payment_id,
//         razorpay_signature,
//       }
//       await axios.post('/api/payment/savepayment', data).then((response)=>{
//         console.log(response.data)
//         localStorage.setItem('userId', response.data.userId);
//         localStorage.setItem('token', response.data.token);
//       });
//       const token = localStorage.getItem('token');
//       window.location.href = `/paymentsuccess?reference=${razorpay_payment_id}&token=${token}&userId=${userId}`;
//       // window.location.href = `/paymentsuccess?reference=${razorpay_payment_id}`;
//       console.log("Payment details sent to the backend");
//     } catch (error) {
//       window.location.href = '/paymenterror';
//       console.error("An error occurred while sending payment details:", error);
     

//     }
//   }

//   const handleCashOnDelivery = async () => {
//     try {
//       // Create the order on the backend without Razorpay details
//       const { data: { order } } = await axios.post('/api/payment/cashondelivery', { amount });
  
//       // ... Save order and other details as needed ...
  
//       // Redirect or show a success message
//       console.log("Order confirmed with Cash On Delivery");
//     } catch (error) {
//       console.error(error);
//       // Handle errors
//     }
//   };
  

//   return (
//     <Container>
//       <Row>
//         <Col md={6}>
//           <h2>Checkout</h2>
//           <Form onSubmit={handleFormSubmit}>
//             <Form.Group controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter your name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Form.Group controlId="formEmail">
//               <Form.Label>Mobile Number</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter your contact number"
//                 value={mobileNumber}
//                 onChange={(e) => setMobileNumber(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Form.Group controlId="formAddress">
//               <Form.Label>Address</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 placeholder="Enter your address"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 required
//               />
//             </Form.Group>


//             <Form onSubmit={handleFormSubmitRazorpay}>
//     <div className="payment-method-box">
//       <input
//         type="radio"
//         id="cashOnDelivery"
//         name="paymentMethod"
//         value="cashOnDelivery"
//         checked={formData.paymentMethod === 'cashOnDelivery'}
//         onChange={() => handlePaymentMethodChange('cashOnDelivery')}
//       />
//       <label htmlFor="cashOnDelivery">Cash On Delivery</label>

//       <input
//         type="radio"
//         id="razorpay"
//         name="paymentMethod"
//         value="razorpay"
//         checked={formData.paymentMethod === 'razorpay'}
//         onChange={() => handlePaymentMethodChange('razorpay')}
//       />
//       <label htmlFor="razorpay">Pay Now with Razorpay</label>
//     </div>

//     {formData.paymentMethod === 'razorpay' && (
//       /* ...Razorpay specific form fields... */
//       <Button variant="primary" type="submit">
//         Proceed to Pay
//       </Button>
//     )}

//     {formData.paymentMethod === 'cashOnDelivery' && (
//       <Button variant="success" type="submit">
//         Confirm Order
//       </Button>
//     )}
//   </Form>
          
//             {/* <Button variant="primary" type="submit">
//               Proceed to Pay
//             </Button> */}
//           </Form>
//         </Col>

//         <Col md={6}>
//           <h2>Payment Summary</h2>
//           {/* Display the amount to be paid */}
//           <h3>Amount to be Paid: {amount}</h3>
//           {/* Additional payment summary or details */}
      
//            </Col>
          
  
//       </Row>
//     </Container>
//   );
// };

// export default CheckoutPage;