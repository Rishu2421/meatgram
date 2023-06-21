// SignUp.js

import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await axios.post('/auth/signup', {
        name,
        email,
        password,
      });
      console.log(response.data); // Sign up successful
      // Redirect to home page or perform other actions
    } catch (error) {
      console.error(error.response.data); // Email already registered or other error
      // Handle error appropriately
    }
  };

  return (
    <div>
      {/* Sign up form */}
    </div>
  );
};

export default SignUp;
