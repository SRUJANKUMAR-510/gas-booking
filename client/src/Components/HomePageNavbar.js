import React from "react";
import cylinder from "../static/images/gas.png";
import { Link } from "react-router-dom";

export default function HomePageNavbar(props) {
    return (
        <nav className="navbar navbar-light bg-light border-dark">
            <div className="container-fluid">
                <Link to="/home" className="navbar-brand">
                    <div style={{ display: "inline-flex" }}>
                        <div
                            style={{
                                padding: 10,
                                backgroundColor: "black",
                                borderRadius: 100,
                            }}
                        >
                            <img
                                src={cylinder}
                                alt=""
                                width="40"
                                height="40"
                                className="rounded-circle mx-20"
                            />
                        </div>
                        <h1
                            style={{
                                margin: "0 10px",
                                fontFamily: "'Inconsolata', monospace",
                            }}
                        >
                            Gas Booking System
                        </h1>
                    </div>
                </Link>
                <div>
                    <Link to={props.link}>
                        <button className="btn btn-success" style={{width: "100px"}}>{props.head}</button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
