import React from 'react';
import { useSearchParams } from 'react-router-dom'
const PaymentSuccess = () => {
    const searchQuery=useSearchParams()[0];

    const referenceNum = searchQuery.get("reference");
  return (
    <div>
      <h2>Payment Successful!</h2>
      <p>Thank you for your payment.</p>
      <p>Your order has been successfully processed.</p>
      <p>Reference Number {referenceNum}</p>

    </div>
  );
};

export default PaymentSuccess;
