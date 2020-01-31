import React, { Component } from "react";
import "../css/CarouselEvents.css";
import { Carousel } from "antd";

export default class CarouselEvents extends Component {
  render() {
    return (
      <div>
        <Carousel autoplay className="carouselEvents">
          <div>
            <img
              src="https://i.imgur.com/yypksvO.jpg"
              className="imageCarousel"
            />
          </div>
          <div>
            <img
              src="https://i.imgur.com/aIAoQbN.png"
              className="imageCarousel"
            />
          </div>

          <div>
            <img
              src="https://i.imgur.com/BWnafwZ.png"
              className="imageCarousel"
            />
          </div>
          <div>
            <img
              src="https://i.imgur.com/X6YdE41.png"
              className="imageCarousel"
            />
          </div>
        </Carousel>
      </div>
    );
  }
}
