import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { AuthProvider } from "./contexts/AuthContext";
function App(){
return (

<AuthProvider>
      <div>
    <Header />
    <Footer />
</div>
</AuthProvider>
);}

export default App;