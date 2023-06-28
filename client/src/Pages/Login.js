import React, { Component } from "react";

import { Link, Navigate } from "react-router-dom";
import "../Style/Login.css";
import axios from "axios";
import HomePageNavbar from "../Components/HomePageNavbar";
import Cookies from "universal-cookie";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      tohome: false,
      homePage: "",
    };
    this.changeusername = this.changeusername.bind(this);
    this.changepaswrd = this.changepaswrd.bind(this);
    this.onsubmit = this.onsubmit.bind(this);
  }
  changeusername(event) {
    this.setState({
      username: event.target.value,
    });
  }
  changepaswrd(event) {
    event.preventDefault();
    this.setState({
      password: event.target.value,
    });
  }
  onsubmit = (event) => {
    event.preventDefault();
    const signin = {
      username: this.state.username,
      password: this.state.password,
    };

    console.log(signin);

    axios
      .post(process.env.REACT_APP_SERVER_URL + "/api/login/", signin)
      .then((res) => {
        console.log(res);
        if (
          res.data.username === this.state.username &&
          res.data.password === this.state.password
        ) {
          const token = new Cookies();
          token.set('username', res.data.username, { path: "/", maxAge: 604800 })
          this.setState({
            tohome: true,
            homePage: res.data.isDealer ? "/dealer" : "/booking",
          });

        } else {
          alert("invalid credentials");
        }
        //   if(res.data.user){
        //      // const token = new Cookies()
        //      // token.set('token', res.data.user.token)
        //       this.setState({tohome:true});

        //   }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <>
        <HomePageNavbar head="Register" link="/Register" />
        <div className="division">
          {this.state.tohome ? (
            <Navigate to={this.state.homePage} />
          ) : (
            <div>
              <h1>User Login</h1>
              <form onSubmit={this.onsubmit} className="login">
                <input
                  type="text"
                  placeholder="userid"
                  name="userid"
                  onChange={this.changeusername}
                  value={this.state.username}
                />
                <br />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.changepaswrd}
                  value={this.state.password}
                />
                <br />
                <button
                  type="submit"
                  className="button"
                  onClick={this.onsubmit}
                >
                  LOGIN
                </button>
                <br />
              </form>
              <div>
                <span className="span">
                  Don't have the account{" "}
                  <Link to="/register">signup</Link>
                </span>
              </div>
              <div>
                <span className="span">
                  Forgot password{" "}
                  <Link to="/forgotpassword">click here</Link>
                </span>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Login;
