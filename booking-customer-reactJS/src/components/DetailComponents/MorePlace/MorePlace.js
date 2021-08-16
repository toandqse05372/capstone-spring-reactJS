import React, { Component } from 'react';
import Slider from "react-slick";
// import Rectangle from '../../../../img/Rectangle 17.png';
import RightOwl from '../../../img/RightOwl.png';
import LeftOwl from '../../../img/LeftOwl.png';
// import './style.css';
import axios from 'axios';
import { showLoader, hideLoader } from '../../../actions/index';
import { connect } from 'react-redux';
import * as Config from '../../../constants/ConfigAPI';

function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
        // <div
        //     className={className}
        //     style={{ ...style, display: "block", background: "red" }}
        //     onClick={onClick}>
        //     <img ></img>
        // </div>
        <img
            onClick={onClick}
            className={className}
            src={LeftOwl}
            alt="?" >
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
            alt="?" >
        </img>
    );
}


class MorePlace extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            listPlace: [],
            compareId: null,
        }
    }

    convertCurrecyToVnd = (currency) => {
        return currency.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    }

    showPlaceOfTopCity = (topCity) => {
        const { myPlace } = this.props;
        const placeid = myPlace.id;
        var result = null;
        if (topCity !== undefined)
            if (topCity.length > 0) {
                result = topCity.map((item, index) => {
                    const availableDay = item.weekDays.sort()
                    var availableDate = ""
                    const today = new Date().getDay()
                    if (availableDay.indexOf(today) !== -1) {
                        availableDate = "Mở cửa ngay hôm nay."
                    } else {
                        availableDate = "Không mở cửa ngày hôm nay."
                    }
                    if (item.id === placeid) {
                        return null;
                    }
                    return (
                        <a
                        href={`/placeDetail/${item.id}`}
                            key={index}
                            className="decoNone"
                            >
                            <div className="owlStyle">
                                <h3 className="owlStyleChil">
                                    <div
                                        className="owlCom3"
                                        style={{
                                            borderRadius: "10px 10px 0px 0px",
                                            backgroundImage: `url(${item.placeImageLink ? item.placeImageLink[0] : "https://toandqse05372-bucket.s3-ap-southeast-1.amazonaws.com/Place_1_2.jpg"})`
                                        }}
                                    >
                                    </div>
                                    <div className="containerOwlChil">
                                        <div style={{ height: "45px" }}>
                                            <p className="owlStyleChil1">{item.name}</p>
                                        </div>
                                        <div>
                                            {/* <p className="owlStyleChil2">{item.basicPrice}</p> */}
                                            <p className="owlStyleChil3">{this.convertCurrecyToVnd(item.basicPrice)}</p>
                                            {/* <p className="owlStyleChil4">Có thể đặt ngay hôm nay</p> */}
                                            <p style={{color: availableDate==="Mở cửa ngay hôm nay."?"#FF7062":"#A5A5A5"}} className="owlStyleChil4">{availableDate}</p>
                                        </div>
                                    </div>
                                </h3>
                            </div >
                        </a >
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

    forByCityId = (topCity, listData1, listData2, listData3) => {
        const settings = {
            // dots: true,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        var result = null;
        if (topCity.length > 0) {
            result = topCity.map((item, index) => {
                if (index === 0) {
                    return (
                        <section key={index} className="py-5">
                            <div className="container">
                                <div >
                                    <h2 className="headerOwl">{item.shortDescription}</h2>
                                    <h2 className="desHeaderOwl">{item.name}</h2>
                                    <Slider {...settings}>
                                        {this.showPlaceOfTopCity(listData1)}
                                    </Slider>
                                </div>
                            </div>
                        </section>
                    );
                }
                if (index === 1) {
                    return (
                        <section key={index} className="py-5">
                            <div className="container">
                                <div >
                                    <h2 className="headerOwl">{item.shortDescription}</h2>
                                    <h2 className="desHeaderOwl">{item.name}</h2>
                                    <Slider {...settings}>
                                        {this.showPlaceOfTopCity(listData2)}
                                    </Slider>
                                </div>
                            </div>
                        </section>
                    );
                }
                if (index === 2) {
                    return (
                        <section key={index} className="py-5">
                            <div className="container">
                                <div>
                                    <h2 className="headerOwl">{item.shortDescription}</h2>
                                    <h2 className="desHeaderOwl">{item.name}</h2>
                                    <Slider {...settings}>
                                        {/* {this.getPlacebyCityId(item.id)} */}
                                        {this.showPlaceOfTopCity(listData3)}
                                    </Slider>
                                </div>
                            </div>
                        </section>
                    );
                } else{
                    return (
                        null
                    )
                }
            });

        } else {
            return (
                <div style={{ width: "200px", visibility: "hidden" }}>
                </div >
            )
        }
        return result;
    }

    componentDidMount = () => {
        this.getLisPlace();
    }
    getLisPlace = async () => {
        const { myPlace } = this.props;
        await axios.get(`${Config.API_URL}/topPlace`, {
            params: {
                cityId: myPlace.cityId
            }
        }).then(res => {
            // console.log(res.data);
            this.setState({
                listPlace: res.data
            })
        }).catch(function (error) {
            console.log(error);
        })
    }

    render() {

        const settings = {
            // dots: true,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        const { listPlace } = this.state;
        const { myPlace } = this.props;
        // console.log(myPlace);
        // address: "xã Hòa Ninh, huyện Hòa Vang"
        // basicPrice: 750000
        // cancelPolicy: null
        // categoryId: (3) [1, 3, 4]
        // cityId: 3
        // cityName: "Đà Nẵng"
        // detailDescription: "Ai đến Đà Nẵng mà không đi du lịch Bà Nà Hills thì thật là thiếu sót đấy! Bà Nà Hills - quần thể du lịch nghỉ dưỡng kết hợp vui chơi giải trí đẳng cấp bậc nhất Việt Nam, được mệnh danh là “chốn bồng lai tiên cảnh”, sở hữu khí hậu tuyệt vời cùng cảnh quan thiên nhiên kỳ thú. Nằm ở đỉnh núi Chúa, cách duy nhất để đến Bà Nà là bạn phải di chuyển bằng cáp treo. Lập 4 kỷ lục thế giới, cáp treo Bà Nà là một điểm thu hút của chính nơi đây. Cáp treo sẽ đưa bạn đi qua, ngắm toàn cảnh núi non hùng vĩ - từ những thác nước cao và những ngọn núi sương mù, đến những cánh rừng dày của thảm thực vật nhiệt đới. Được tạp chí TIME vinh danh trong “Top 10 điểm đến tuyệt vời nhất thế giới năm 2018” và trang The Guardian công nhận là “Cây cầu đi bộ ấn tượng nhất thế giới”."
        // id: 9
        // mail: "banahills@gmail.com"
        // name: "Bà Nà Hills"
        // openingHours: "7 giờ đến 18 giờ"
        // phoneNumber: "0988998998"
        // placeImageLink: (5) ["https://dman-bucket.s3-ap-southeast-1.amazonaws.com/Place_9_4.jpg", "https://dman-bucket.s3-ap-southeast-1.amazonaws.com/Place_9_3.jpg", "https://dman-bucket.s3-ap-southeast-1.amazonaws.com/Place_9_1.jpg", "https://dman-bucket.s3-ap-southeast-1.amazonaws.com/Place_9_2.jpg", "https://dman-bucket.s3-ap-southeast-1.amazonaws.com/Place_9_5.jpg"]
        // placeKey: "DN01"
        // shortDescription: "Trải nghiệm cáp treo Bà Nà Hill, một trong những hệ thống cáp treo dài nhất thế giới, với cảnh đẹp từ trên đỉnh núi Chúa!<br><br>Tham quan Làng Nước Pháp và chiêm ngưỡng lối kiến trúc sang trọng này với một ngôi làng Pháp mô phỏng.<br><br>Khám phá hàng loạt các điểm tham quan không-thể-bỏ-qua, từ Cầu Vàng đến Hầm rượu Debay.<br><br>Trải nghiệm các trò chơi và hoạt động tại những điểm giải trí nổi tiếng: Fantasy Park, Alpine Coaster và Tombstone Temple."
        // status: "ACTIVE"
        // weekDays: (7) [0, 2, 1, 4, 3, 5, 6]
        // console.log(listPlace);
        return (
            // this.forByCityId(topCity, listData1, listData2, listData3)
            <section className="py-5">
                <div className="container">
                    <h2 className="headerOwl">Những trải nghiệm khác tại {myPlace.cityName}</h2>
                    <Slider {...settings}>
                        {this.showPlaceOfTopCity(listPlace)}
                    </Slider>
                </div>
            </section>
        );

    }
}

// export default Slick1;

const mapStateToProps = state => {
    return {
        // visitorType: state.Ticket
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

export default connect(mapStateToProps, mapDispatchToProps)(MorePlace);