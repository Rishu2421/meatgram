import React from "react";

function LogIn(){
    return (
<div class="booking">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-5 submit-form">
        <div class="booking-form">
          <form action="/login" method="post">
            <div class="control-group">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Your Username"
                  required="required"
                  name="email"
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <i class="far fa-user"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="control-group">
              <div class="input-group">
                <input
                  type="password"
                  class="form-control"
                  placeholder="password"
                  required="required"
                  name="password"
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <i class="far fa-eye"></i>
                  </div>
                </div>
              </div>
            
</div>
            <div>
              <button class="btn custom-btn" type="submit">Log In</button>
            </div>
          </form>
        </div>
      </div>

      <div class="col-lg-5 submit-form">
        <div class="card">
          <div class="card-body">
            <a class="btn btn-block btn-social btn-google" href="/auth/google" role="button">
              <i class="fab fa-google"></i>
             Sign In with Google                               
            </a>
          </div>
       
          <div class="card-body">
            <a class="btn btn-block btn-social btn-facebook" href="/auth/facebook" role="button">
              <i class="fab fa-facebook"></i>
              Sign Up with Facebook
            </a>
          </div>
          {/* <!-- <div class="btn-block fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false"></div> --> */}
        </div>
      </div>
    </div>
  </div>
</div>
    );
}

export default LogIn;