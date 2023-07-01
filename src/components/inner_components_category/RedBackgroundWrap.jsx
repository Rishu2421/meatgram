import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function RedBackgroundWrap() {
  const location = useLocation();

  // Split the URL path into separate segments
  const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
  
  return (
    <section className="red-bg-wrap">
      <div className="container">
        <div className="bg-wrap">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {pathSegments.map((segment, index) => (
              <><li key={index}>
                <span></span>
              </li><li>
                  <Link to={`/${segment}`}>{segment}</Link>
                </li></>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default RedBackgroundWrap;



// import React from "react";

// function RedBackgroundWrap(){
//     return (
//           <section className="red-bg-wrap">
//             <div className="container">
//               <div className="bg-wrap">
//                 <ul>
//                   <li>
//                     <a href="/">home</a>
//                   </li>
//                   <li>
//                     <p></p>
//                   </li>
//                   <li>
//                     <a href="/chicken">chiken</a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </section>
//         );
//       }

// export default RedBackgroundWrap;
