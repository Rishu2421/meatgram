import React from "react";


function SignUp(){
    return (
        <div class="booking">
  <div class="container">
    <div class="row align-items-center">
      <h6 class="warning" id="alert-user">User already Exist!!!</h6>
      <div class="col-lg-5 submit-form">
        <div class="booking-form">
          <form action="/signin" method="post">
            <div class="control-group">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Name"
                  required="required"
                  name="username"
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
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  required="required"
                  name="email"
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <i class="far fa-envelope"></i>
                  </div>
                </div>
              </div>
            </div>

            <div class="control-group">
              <div class="input-group" data-target-input="nearest">
                <input
                  type="password"
                  name="password"
                  required="required"
                  class="form-control"
                  placeholder="Enter Your Passowrd"
                 
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <i class="fa-thin fa-eye-slash"></i>
                  </div>
                </div>
              </div>
            </div>

            <div class="control-group">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Mobile"
                  required="required"
                  name="mobileNo"
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <i class="fa fa-mobile-alt"></i>
                  </div>
                </div>
              </div>
            </div>

            <div class="control-group">
              <div
                class="input-group date"
                id="date"
                data-target-input="nearest"
              >
                <input
                  type="date"
                  class="form-control datetimepicker-input"
                  placeholder="Date Of Birth"
                  data-target="#date"
                  data-toggle="datetimepicker"
                  name="dob"
                />
                <div
                  class="input-group-append"
                  data-target="#date"
                  data-toggle="datetimepicker"
                ></div>
              </div>
            </div>
            <div class="control-group">
              <div
                class="input-group time"
                id="time"
                data-target-input="nearest"
              >
                <input
                  type="text"
                  class="form-control datetimepicker-input"
                  placeholder="Time"
                  data-target="#time"
                  data-toggle="datetimepicker"
                  name="logTime"
                />
                <div
                  class="input-group-append"
                  data-target="#time"
                  data-toggle="datetimepicker"
                >
                  <div class="input-group-text">
                    <i class="far fa-clock"></i>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button class="btn custom-btn" type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </div>

      <div class="col-lg-5 submit-form">
        <div class="card">
          <div class="card-body">
            <a
              class="btn btn-block btn-social btn-google"
              href="/auth/google"
              role="button"
            >
              <i class="fab fa-google"></i>
              Sign In with Google
            </a>
          </div>

          <div class="card-body">
            <a
              class="btn btn-block btn-social btn-facebook"
              href="/auth/facebook"
              role="button"
            >
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

export default SignUp;