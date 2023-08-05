import React,{useEffect,useContext} from 'react';
import { useSearchParams,useLocation } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';
const PaymentSuccess = () => {
    const searchQuery=useSearchParams()[0];
    const location=useLocation();
    const token = new URLSearchParams(location.search).get('token');
    const userId = new URLSearchParams(location.search).get('userId');
    const { setToken, setUserId } = useContext(AuthContext);
    useEffect(() => {
      // Save the token and userId to context and local storage
      setToken(token);
      setUserId(userId);
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      // Do any other actions needed on successful payment
    }, [token, userId, setToken, setUserId]);
  
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
