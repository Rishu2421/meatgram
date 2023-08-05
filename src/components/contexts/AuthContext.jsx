import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Fetch userId and token from local storage after the component mounts
    const storedUserId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("token");

    // Set the state with the fetched data, or keep the default value if null
    setUserId(storedUserId || null);
    setToken(storedToken || null);
  }, []);
 
  return (
    <AuthContext.Provider value={{ userId, setUserId, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

// // AuthContext.js
// import React, { createContext, useState } from "react";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
//   const [token, setToken] = useState(localStorage.getItem("token") || null);

//   return (
//     <AuthContext.Provider value={{ userId, setUserId, token, setToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };
