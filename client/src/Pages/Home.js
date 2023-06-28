import React from "react";
import HomePageNavbar from "../Components/HomePageNavbar";
// import HomePageCorousel from "../Components/HomePageCorousel";

export default function Home() {
    return (
        <div className="home">
            <HomePageNavbar head="Login" link="/Login" />
            <div className="container"
                style={{
                    display: "flex",
                    height: "80vh",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {/* <HomePageCorousel /> */}
            </div>
        </div>
    );
}
