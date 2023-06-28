import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import HomePageNavbar from "../Components/HomePageNavbar";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      address: "",
      pincode: "",
  
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
    this.changefirstname = this.changefirstname.bind(this);
    this.changelastname = this.changelastname.bind(this);
    this.changeadress = this.changeadress.bind(this);
    this.changepincode = this.changepincode.bind(this);
  
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
  changefirstname(event) {
    this.setState({
      first_name: event.target.value,
    });
  }
  changelastname(event) {
    this.setState({
      last_name: event.target.value,
    });
  }
  changeadress(event) {
    this.setState({
      address: event.target.value,
    });
  }
  changepincode(event) {
    this.setState({
      pincode: event.target.value,
    });
  }

  
  onSubmit(event) {
    event.preventDefault();
    const registered = {
      firstname: this.state.first_name,
      lastname: this.state.last_name,
      username: this.state.username,
      password: this.state.password,
      pincode: this.state.pincode,
      email: this.state.email,
      address: this.state.address,
      phone_number: this.state.phone_number,
      company: "",
    };
    axios
      .post(process.env.REACT_APP_SERVER_URL + "/api/register", registered)
      .then((response) => console.log(response.data));

    this.setState({
      first_name: "",
      last_name: "",
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
            <section style={{ height: "40vh" }}>
              <div
                className="mask align-items-center gradient-custom"
              >
                <div className="container mt-3">
                  <div className="row justify-content-center">
                    <div className="col-12 col-lg-9 col-xl-7">
                      <div className="card">
                        <div className="card-body p-4 p-md-4">
                          <h3 className="mb-2 pb-2">
                            Registration Form
                          </h3>
                          <form onSubmit={this.onSubmit}>
                            <div className="row">
                              <div className="col-md-6 mb-2">
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
                              <div className="col-md-6 mb-2">
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
                              <div className="col-md-6 mb-2">
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
                              <div className="col-md-6 mb-2">
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
                              <div className="col-md-6 mb-2">
                                <div className="form-outline">
                                  <input
                                    type="text"
                                    id="firstname"
                                    className="form-control"
                                    value={this.state.first_name}
                                    onChange={this.changefirstname}
                                    required
                                  />
                                  <label
                                    className="form-label"
                                    htmlFor="lastname"
                                  >
                                    firstname
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-6 mb-2">
                                <div className="form-outline">
                                  <input
                                    type="text"
                                    id="lastname"
                                    className="form-control"
                                    value={this.state.last_name}
                                    onChange={this.changelastname}
                                    required
                                  />
                                  <label
                                    className="form-label"
                                    htmlFor="lastName"
                                  >
                                    lastname
                                  </label>
                                </div>
                              </div>
                            </div>


                            <div className="row">
                              <div className="col-md-6 mb-2">
                                <div className="form-outline">
                                  <input
                                    type="address"
                                    id="Address"
                                    className="form-control"
                                    value={this.state.address}
                                    onChange={this.changeadress}
                                    required
                                  />
                                  <label
                                    className="form-label"
                                    htmlFor="address"
                                  >
                                   Address
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-6 mb-2">
                                <div className="form-outline">
                                  <input
                                    type="tel"
                                    id="phoneNumber"
                                    className="form-control"
                                    value={this.state.pincode}
                                    onChange={this.changepincode}
                                    required
                                  />
                                  <label
                                    className="form-label"
                                    htmlFor="pincode"
                                  >
                                   Pin Code
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12">
                                <div className="mt-3">
                                  <input
                                    className="btn btn-warning"
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
