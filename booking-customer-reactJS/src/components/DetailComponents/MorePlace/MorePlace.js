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
                        availableDate = "M??? c???a ngay h??m nay."
                    } else {
                        availableDate = "Kh??ng m??? c???a ng??y h??m nay."
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
                                            {/* <p className="owlStyleChil4">C?? th??? ?????t ngay h??m nay</p> */}
                                            <p style={{color: availableDate==="M??? c???a ngay h??m nay."?"#FF7062":"#A5A5A5"}} className="owlStyleChil4">{availableDate}</p>
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
        // address: "x?? H??a Ninh, huy???n H??a Vang"
        // basicPrice: 750000
        // cancelPolicy: null
        // categoryId: (3) [1, 3, 4]
        // cityId: 3
        // cityName: "???? N???ng"
        // detailDescription: "Ai ?????n ???? N???ng m?? kh??ng ??i du l???ch B?? N?? Hills th?? th???t l?? thi???u s??t ?????y! B?? N?? Hills - qu???n th??? du l???ch ngh??? d?????ng k???t h???p vui ch??i gi???i tr?? ?????ng c???p b???c nh???t Vi???t Nam, ???????c m???nh danh l?? ???ch???n b???ng lai ti??n c???nh???, s??? h???u kh?? h???u tuy???t v???i c??ng c???nh quan thi??n nhi??n k??? th??. N???m ??? ?????nh n??i Ch??a, c??ch duy nh???t ????? ?????n B?? N?? l?? b???n ph???i di chuy???n b???ng c??p treo. L???p 4 k??? l???c th??? gi???i, c??p treo B?? N?? l?? m???t ??i???m thu h??t c???a ch??nh n??i ????y. C??p treo s??? ????a b???n ??i qua, ng???m to??n c???nh n??i non h??ng v?? - t??? nh???ng th??c n?????c cao v?? nh???ng ng???n n??i s????ng m??, ?????n nh???ng c??nh r???ng d??y c???a th???m th???c v???t nhi???t ?????i. ???????c t???p ch?? TIME vinh danh trong ???Top 10 ??i???m ?????n tuy???t v???i nh???t th??? gi???i n??m 2018??? v?? trang The Guardian c??ng nh???n l?? ???C??y c???u ??i b??? ???n t?????ng nh???t th??? gi???i???."
        // id: 9
        // mail: "banahills@gmail.com"
        // name: "B?? N?? Hills"
        // openingHours: "7 gi??? ?????n 18 gi???"
        // phoneNumber: "0988998998"
        // placeImageLink: (5) ["https://dman-bucket.s3-ap-southeast-1.amazonaws.com/Place_9_4.jpg", "https://dman-bucket.s3-ap-southeast-1.amazonaws.com/Place_9_3.jpg", "https://dman-bucket.s3-ap-southeast-1.amazonaws.com/Place_9_1.jpg", "https://dman-bucket.s3-ap-southeast-1.amazonaws.com/Place_9_2.jpg", "https://dman-bucket.s3-ap-southeast-1.amazonaws.com/Place_9_5.jpg"]
        // placeKey: "DN01"
        // shortDescription: "Tr???i nghi???m c??p treo B?? N?? Hill, m???t trong nh???ng h??? th???ng c??p treo d??i nh???t th??? gi???i, v???i c???nh ?????p t??? tr??n ?????nh n??i Ch??a!<br><br>Tham quan L??ng N?????c Ph??p v?? chi??m ng?????ng l???i ki???n tr??c sang tr???ng n??y v???i m???t ng??i l??ng Ph??p m?? ph???ng.<br><br>Kh??m ph?? h??ng lo???t c??c ??i???m tham quan kh??ng-th???-b???-qua, t??? C???u V??ng ?????n H???m r?????u Debay.<br><br>Tr???i nghi???m c??c tr?? ch??i v?? ho???t ?????ng t???i nh???ng ??i???m gi???i tr?? n???i ti???ng: Fantasy Park, Alpine Coaster v?? Tombstone Temple."
        // status: "ACTIVE"
        // weekDays: (7) [0, 2, 1, 4, 3, 5, 6]
        // console.log(listPlace);
        return (
            // this.forByCityId(topCity, listData1, listData2, listData3)
            <section className="py-5">
                <div className="container">
                    <h2 className="headerOwl">Nh???ng tr???i nghi???m kh??c t???i {myPlace.cityName}</h2>
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