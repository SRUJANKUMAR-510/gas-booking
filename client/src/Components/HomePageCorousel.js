import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import la from "../static/images/la.jpg";
import ny from "../static/images/ny.jpg";
import chicago from "../static/images/chicago.jpg";


function homePageCorousel() {
  return (
    <Carousel style={{
        width: "75%",
    }}>
      <Carousel.Item>
        <img
          className="b-block w-100"
          src={la}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="b-block w-100"
          src={chicago}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="b-block w-100"
          src={ny}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default homePageCorousel;