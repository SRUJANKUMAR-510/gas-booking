import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import HomePageNavbar from "../Components/HomePageNavbar";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      phone_number: "",
      tohome: false,
    };
    this.changeusername = this.changeusername.bind(this);
    this.changepassword = this.changepassword.bind(this);
    this.changeemail = this.changeemail.bind(this);
    this.changephonenumber = this.changephonenumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  changeusername(event) {
    this.setState({
      username: event.target.value,
    });
  }
  changepassword(event) {
    this.setState({
      password: event.target.value,
    });
  }
  changeemail(event) {
    this.setState({
      email: event.target.value,
    });
  }
  changephonenumber(event) {
    this.setState({
      phone_number: event.target.value,
    });
  }
  onSubmit(event) {
    event.preventDefault();
    const registered = {
      firstname: "",
      lastname: "",
      username: this.state.username,
      password: this.state.password,
      pincode: null,
      email: this.state.email,
      address: "",
      phone_number: this.state.phone_number,
      company: "",
    };
    axios
      .post(process.env.REACT_APP_SERVER_URL + "/api/register", registered)
      .then((response) => console.log(response.data));

    this.setState({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      pincode: "",
      email: "",
      address: "",
      phone_number: "",
      company: "",
      tohome: true,
    });
  }
  render() {
    return (
      <div>
        {this.state.tohome ? (
          <Navigate to="/home" />
        ) : (
          <>
            <HomePageNavbar head="Login" link="/Login"/>
            <section style={{ height: "80vh" }}>
              <div
                className="mask d-flex align-items-center h-100 gradient-custom"
              >
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-12 col-lg-9 col-xl-7">
                      <div className="card">
                        <div className="card-body p-4 p-md-5">
                          <h3 className="mb-4 pb-2">
                            Registration Form
                          </h3>
                          <form onSubmit={this.onSubmit}>
                            <div className="row">
                              <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                  <input
                                    type="text"
                                    id="username"
                                    className="form-control"
                                    value={this.state.username}
                                    onChange={this.changeusername}
                                    required
                                  />
                                  <label
                                    className="form-label"
                                    htmlFor="username"
                                  >
                                    Username
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                  <input
                                    type="text"
                                    id="password"
                                    className="form-control"
                                    value={this.state.password}
                                    onChange={this.changepassword}
                                    required
                                  />
                                  <label
                                    className="form-label"
                                    htmlFor="password"
                                  >
                                    Password
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                  <input
                                    type="email"
                                    id="emailAddress"
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={this.changeemail}
                                    required
                                  />
                                  <label
                                    className="form-label"
                                    htmlFor="emailAddress"
                                  >
                                    Email
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                  <input
                                    type="tel"
                                    id="phoneNumber"
                                    className="form-control"
                                    value={this.state.phone_number}
                                    onChange={this.changephonenumber}
                                    required
                                  />
                                  <label
                                    className="form-label"
                                    htmlFor="phoneNumber"
                                  >
                                    Phone Number
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12">
                                <div className="mt-4">
                                  <input
                                    className="btn btn-warning btn-lg"
                                    type="submit"
                                    defaultValue="Submit"
                                  />
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    );
  }
}

export default Register;
