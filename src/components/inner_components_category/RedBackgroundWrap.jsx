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
            <li key="home">
              <Link to="/">Home</Link>
            </li>
            {pathSegments.map((segment) => (
              <li key={segment}>
                <Link to={`/${segment}`}>{segment}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default RedBackgroundWrap;
