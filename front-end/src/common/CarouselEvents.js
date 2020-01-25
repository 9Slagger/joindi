import React, { Component } from  "react";
import "../css/CarouselEvents.css"
import { Carousel } from  "antd";

export default class CarouselEvents extends Component {
  render() {
    return (
      <div>
        <Carousel  autoplay className="carouselEvents">
          <div>
          <h3 className="text">1</h3>
          </div>
          <div>
            <h3 className="text">2</h3>
          </div>
          <div>
            <h3 className="text">3</h3>
          </div>
          <div>
            <h3 className="text">4</h3>
          </div>
        </Carousel>
      </div>
    );
  }
}
