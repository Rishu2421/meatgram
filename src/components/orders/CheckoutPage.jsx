import React, { useState,useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const CheckoutPage = ({ amount,products }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');

  
  useEffect(() => {
    const razorpaySuccessHandler = response => {
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




  const handleFormSubmit = async (e) => {
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
         const result=  await axios.post('/api/payment/paymentverification', response);
         if(result.status===200){
          savePaymentDetails(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature
          );
         }
         
          },
        prefill: {
          name,
          email,
          contact: '9000090000',
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
      console.log(razor);
      razor.open();

      // console.log(razor);
      // After successful payment, the paymentVerification route in the backend will handle saving the payment details in the database
    } catch (error) {
      console.error(error);
    }
  };
 

  async function savePaymentDetails(razorpay_order_id, razorpay_payment_id, razorpay_signature) {
    try {
      // Send the payment details to the backend
      const userId = localStorage.getItem('userId');
      const data = {
        name,
        email,
        dob,
        address,
        userId,
        amount,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      }
      await axios.post('/api/payment/savepayment', data);
      window.location.href = `http://localhost:3001/paymentsuccess?reference=${razorpay_payment_id}`;
      console.log("Payment details sent to the backend");
    } catch (error) {
      window.location.href = 'http://localhost:3001/paymenterror';
      console.error("An error occurred while sending payment details:", error);
     

    }
  }
  return (
    <Container>
      <Row>
        <Col md={6}>
          <h2>Checkout</h2>
          <Form onSubmit={handleFormSubmit}>
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
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter your date of birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
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

            <Button variant="primary" type="submit">
              Proceed to Pay
            </Button>
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



// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import axios from "axios";

// const CheckoutPage = ({ amount }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [dob, setDob] = useState('');
//   const [address, setAddress] = useState('');
  

//     // You can access the form values from the state variables (name, email, dob, address)
//     // console.log('Form submitted:', { name, email, dob, address });


//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     // Process the payment or perform any necessary actions here
 
//     const {data:{key}}= await axios.get("http://localhost:3000/api/getkey");
//     const data = {
//       amount: amount,
//     };
//     axios.post("/api/payment/checkout", data).then(({ data: { order } }) => {
     
//       var options = {
//         key,
//         amount: order.amounts, 
//         currency: "INR",
//         name: "MeatGram",
//         description: "Buy Your Product",
//         image: "/images/logo.png",
//         order_id: order.id, 
//         callback_url: "http://localhost:3001/api/payment/paymentverification",
//         prefill: {
//             name,
//             email,
//             contact: "9000090000"
//         },
//         notes: {
//             "address": "Razorpay Corporate Office"
//         },
//         theme: {
//             "color": "#111212"
//         }
//     };

//     const razor = new window.Razorpay(options);
//         razor.open();
//       })
//       .catch((error) => {
//         console.error(error);
//       });

    
//     }
   

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
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Form.Group controlId="formDob">
//               <Form.Label>Date of Birth</Form.Label>
//               <Form.Control
//                 type="date"
//                 placeholder="Enter your date of birth"
//                 value={dob}
//                 onChange={(e) => setDob(e.target.value)}
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

//             <Button variant="primary" type="submit">
//               Proceed to Pay
//             </Button>
//           </Form>
//         </Col>

//         <Col md={6}>
//           <h2>Payment Summary</h2>
//           {/* Display the amount to be paid */}
//           <h3>Amount to be Paid: {amount}</h3>
//           {/* Additional payment summary or details */}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default CheckoutPage;
