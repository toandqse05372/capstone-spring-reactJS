import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from '../../../components/Menu/Menu';
import Slider from 'react-slick';
import './PlaceDetail.css'
// import SliderPic from '../../../img/Slider.png';
import RightOwl from '../../../img/VectorArowRight.png';
import LeftOwl from '../../../img/VectorArowLeft.png';
import Detail from '../../../components/DetailComponents/PlaceDetailComponents/Detail';
import Footer2 from '../../../components/Footer/Footer2/Footer2';
import callApi from '../../../config/utils/apiCaller';
import FullPageLoader from '../../../components/FullPageLoader/FullPageLoader';
import { showLoader, hideLoader } from '../../../actions';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <img
            onClick={onClick}
            className={className}
            src={RightOwl}
            style={{
                ...style, marginRight: "50px",
                zIndex: "1", width: "25px", height: "50px"
            }}
            alt="Fail to load" >
        </img>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <img
            onClick={onClick}
            className={className}
            src={LeftOwl}
            style={{
                ...style, marginLeft: "50px",
                zIndex: "1", width: "25px", height: "50px"
            }}
            alt="Fail to load" >
        </img>
    );
}

class PlaceDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            place: null
        }
    }

    componentDidMount = async () => {
        const { showLoader, hideLoader } = this.props;
        const { match } = this.props;
        var id = match.params.id;
        showLoader();
        await callApi(`placeClient/${id}`, 'GET', null).then(res => {
            this.setState({ place: res.data })
            hideLoader();
        }).catch(error => {
            hideLoader();
            this.props.history.push("/404");
        });
    }

    renderSlider = (array) => {
        var result = null;
        if (array.length > 0) {
            result = array.map((item, index) => {
                return (
                    <div className="sliderBox" key={index}>
                        <div  >
                            <img
                                width="100%"
                                height="600px"
                                src={item}
                                alt="fail to load" />
                        </div>
                    </div>
                );
            })
        } else if (array.length === 0) {
            return (
                <p>Not Found</p>
            );
        }
        return result;
    }


    render() {
        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 2000,
            cssEase: "ease-in-out",
            pauseOnHover: true,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        const { place } = this.state;
        if (place !== null) {
            for (let index = 0; index < place.placeImageLink.length; index++) {
            }
        }
        if (place != null) {
            return (
                <div >
                    <div
                        className="container containerSliderTOP"
                        >
                        <Menu />
                       
                            <Slider {...settings}>
                                {this.renderSlider(place.placeImageLink)}
                            </Slider>
                      
                        <Detail place={place} />

                    </div>
                    <div>
                        <Footer2 />
                        <FullPageLoader />
                    </div>
                </div>
            );
        } else {
            return (
                <div><Menu /><FullPageLoader /></div>
            )
        }
    }

}

const mapStateToProps = state => {
    return {
        loader: state.Loader
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

// export default MyCounter;
export default (connect(mapStateToProps, mapDispatchToProps)(PlaceDetail));