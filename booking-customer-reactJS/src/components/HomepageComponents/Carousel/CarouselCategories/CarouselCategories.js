import React, { Component } from 'react';
import Slider from "react-slick";
import RightOwl from '../../../../img/RightOwl.png';
import LeftOwl from '../../../../img/LeftOwl.png';
import './CarouselCategories.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { showLoader, hideLoader } from '../../../../actions/index';
import Flip from 'react-reveal/Flip';
import Fade from 'react-reveal/Fade';

function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
        <img
            onClick={onClick}
            className={className}
            src={LeftOwl}
            alt="FAIL TO LOAD" >
        </img>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <img
            onClick={onClick}
            className={className}
            src={RightOwl}
            style={{ ...style, margin: "5em" }}
            alt="FAIL TO LOAD" >
        </img>
    );
}

//Home page's owl carousel of all Categories

class CarouselCategories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            index: 0,
        }

    }

    showAllCategory = (listCategory) => {
        var result = null;
        if (listCategory.length > 0) {
            result = listCategory.map((item, index) => {
                return (
                    <Fade key={index} duration={index * 235}>
                        <Link
                            className="decoNone"
                            to={`/searchedPlace?listCatID=${item.id}`}>
                            <div className="owlStyle">
                                <h3 style={{ border: "none" }} className="owlStyleChil">
                                    <div
                                        style={{ height: "170px" }}
                                    >
                                        <img
                                            className="coverImg"
                                            src={item.iconLink}
                                            alt="FAIL TO LOAD" />
                                    </div>
                                    <div className="containerOwlChil">
                                        {/* <div style={{height: "5px"}}> */}
                                        <p className="catOwlStyleChil1">{item.categoryName}</p>
                                        {/* </div> */}
                                        <p className="catOwlStyleChil2">{item.description}
                                        </p>
                                    </div>
                                </h3>
                            </div >
                        </Link>
                    </Fade>
                );
            });
        } else {
            return (
                <div>not found</div>
            )
        }
        return result;
    }
    next = () => {
        this.slider.slickNext();
    };
    previous = () => {
        this.slider.slickPrev();
    };
    beforeChange = (prev, next) => {
        this.setState({ index: next });
    };
    render() {
        const settings = {
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
            arrows: true,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            beforeChange: this.beforeChange
        };
        return (
            <section className="py-5">
                <div className="container">
                    <Flip top cascade>
                        <h2 className="headerOwl">Khám phá các danh mục có tại Goboki</h2>
                        <h2 className="desHeaderOwl">Vui hết sức, chơi hết mình</h2>
                    </Flip>
                    <Slider {...settings}>
                        {this.showAllCategory(this.props.listCategory)}
                    </Slider>
                </div>
            </section>
        );

    }
}

const mapStateToProps = state => {
    return {
        listCategory: state.Categories

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        showLoader: () => {
            dispatch(showLoader())
        },
        hideLoader: () => {
            dispatch(hideLoader())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarouselCategories);