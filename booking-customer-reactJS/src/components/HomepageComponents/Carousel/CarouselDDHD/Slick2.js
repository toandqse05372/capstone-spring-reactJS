import React, { Component } from 'react';
import Slider from "react-slick";
import RightOwl from '../../../../img/RightOwl.png';
import LeftOwl from '../../../../img/LeftOwl.png';
import './style.css';
import { Link } from 'react-router-dom';
import Flip from 'react-reveal/Flip';
import Fade from 'react-reveal/Fade';

function SampleNextArrow(props) { //custom Owl Carousel next arrow
  const { className, onClick } = props;
  return (
    <img
      onClick={onClick}
      className={className}
      src={LeftOwl}
      alt="?" >
    </img>
  );
}

function SamplePrevArrow(props) { //custom Owl Carousel prev arrow
  const { className, style, onClick } = props;
  return (
    <img
      onClick={onClick}
      className={className}
      src={RightOwl}
      style={{ ...style, margin: "5em" }}
      alt="?" >
    </img>
  );
}
//Home page's Owl Carousel place of top city
class Slick2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
    }
  }

  showTopcity = (listTopcity) => {
    var result = null;
    if (listTopcity.length > 0) {
      result = listTopcity.map((item, index) => {
        return (
          <Fade key={index}>
            <Link
              className="decoNone"
              to={`/searchedPlace?listCityID=${item.id}`}>
              <div className="owlStyle">
                <h3 style={{ border: "none" }} className="owlStyleChil">
                  <div className="owlCom3"
                    style={{
                      borderRadius: "10px",
                      backgroundImage: `linear-gradient(180deg, rgba(255, 112, 98, 0.0677083) 0%, #FF7062 140.38%),url(${item.imageLink ? item.imageLink : ""})`
                    }}>{item.name}</div>
                </h3>
              </div >
            </Link>
          </Fade>
        );
      });
    } else {
      return (
        <div style={{ width: "200px", visibility: "hidden" }}>
        </div >
      )
    }
    return result;
  }

  next = () => { //active next arrow
    this.slider.slickNext();
  };

  previous = () => { //active prev arrow
    this.slider.slickPrev();
  };

  beforeChange = (prev, next) => {
    this.setState({ index: next });
  };

  render() {
    const { topCity } = this.props;
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      beforeChange: this.beforeChange
    };
    return (
      <section className="py-5">
        <div className="container">
          <Flip top cascade>
            <h2 className="headerOwl">Điểm đến hàng đầu</h2>
            <h2 className="desHeaderOwl">Bạn đã sẵn sàng khám phá những địa điểm tốt nhất cùng chúng tôi?</h2>
          </Flip>
          <Slider {...settings}>
            {this.showTopcity(topCity)}
          </Slider>
        </div>
      </section>
    );

  }
}

export default Slick2;
