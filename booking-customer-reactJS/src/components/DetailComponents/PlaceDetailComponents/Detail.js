import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Detail.css';
import '../RightPartDetail/RightPartDetail.css';
import DetailPic from '../../../img/Detailpic.png';
import TabDetail from '../TabDetail/TabDetai';
import { Redirect } from 'react-router-dom';
import ReTicketType2 from '../TicketType/ReTicketType2';
import { showLoader, hideLoader } from '../../../actions/index';
import MorePlace from '../MorePlace/MorePlace';
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';
import Flip from 'react-reveal/Flip';

class Detail extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef()
        this.state = {
            price: 500,
            ticketTypeArray: [],
            placeChoosed: null,
            ticketType: [],
            show1stAnimate: false,
            open: false,

        }
    }
    scrollToMyRef = () => window.scrollTo({ top: this.myRef.current.offsetTop + 300, behavior: 'smooth' });

    handleClick = () => {
        this.setState({
            show1stAnimate: !this.state.show1stAnimate
        });
    }

    showShortDescrip = (shortDesCrip) => {
        const splitArray = shortDesCrip.split('<br><br>');
        var result = null;
        if (splitArray.length > 0) {
            result = splitArray.map((item, index) => {
                return (
                    <li
                        key={index}
                        className="b">{item}
                    </li>
                );
            });
        }
        else if (splitArray.length === 0) {
            return (
                <p>Not Found</p>
            );
        }
        return result;
    }


    render() {
        var { place } = this.props
        

        const availableDay = place.weekDays.sort()
        var textAvailableDay = "";
        
        for (let index = 0; index < availableDay.length - 1; index++) {
            const element = availableDay[index] + 1;
            textAvailableDay += "T" + element + ", "
        }
        if (textAvailableDay.includes("T1") === true) {
            textAvailableDay += "T" + (availableDay[availableDay.length - 1] + 1) + ", "
        } else {
            textAvailableDay += "T" + (availableDay[availableDay.length - 1] + 1)
        }
        if (availableDay.length === 7) {
            textAvailableDay = "mọi ngày trong tuần"
        }
        const textAvailableDayVN = textAvailableDay.replace('T1,', 'CN, ')

        if (textAvailableDayVN.includes("CN, ") === true) {
            console.log("YES")
            console.log(textAvailableDayVN.split("CN, ")[1] + "CN")
            textAvailableDay = textAvailableDayVN.split("CN, ")[1] + "CN"
        }
    

        if (place !== undefined) {
            return (
                <div>
                    <div
                        style={{
                            marginTop: "20px",
                            fontFamily: 'Inter'
                        }}
                        className="row" >

                        <div
                            className="col-8">

                            <h3>{place.name}</h3>
                            <hr style={{ border: "1.5px solid #E3E3E3", borderRadius: "2px" }} />

                            <Flip top>
                                <div
                                    aria-controls="example-collapse-text"
                                    aria-expanded={this.state.open}
                                    id="inline">
                                    <div className="bulletListCustome"></div>
                                    <div className="content">Điểm nổi bật</div>
                                </div>
                            </Flip>
                            <ul className="a">
                                {this.showShortDescrip(place.shortDescription)}
                            </ul>
                            <div ref={this.myRef}></div>
                            <Flip top>
                                <div id="inline">
                                    <div className="bulletListCustome"></div>
                                    <div className="content">Các lựa chọn vé</div>
                                </div>
                            </Flip>
                            <div>
                                <ReTicketType2
                                    place={place} weekDays={place.weekDays} ticketType={place.ticketTypes} />
                            </div>

                            <Flip top>
                                <div id="inline">
                                    <div className="bulletListCustome"></div>
                                    <div className="content">Bạn được trải nghiệm những gì?</div>
                                </div>
                            </Flip>

                            <Flip top>
                                <span className="longDescription">
                                    {place.detailDescription}
                                </span>
                            </Flip>
                            <div
                                style={{
                                    marginTop: "40px",
                                    overflow: "hidden",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center"
                                }}
                            >
                                <img src={place.placeImageLink ? place.placeImageLink[0] : DetailPic} alt="FAIL TO LOAD" width="100%" height="auto" />
                            </div>
                            <Flip top>
                                <div
                                    style={{ paddingTop: "40px" }}
                                    id="inline">
                                    <div className="bulletListCustome"></div>
                                    <div className="content">Chi tiết</div>
                                </div>
                            </Flip>

                            <div className="placeDetail">
                                <TabDetail place={place} />
                            </div>

                        </div>

                        <div
                            className="col">
                            {/* <RightPartDetail /> */}
                            <div className="rightPart"
                            >
                                <p className="p1">Giá từ</p>
                                <p className="p2">{place.basicPrice.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} đ</p>
                                <div className="row">
                                    <button
                                        onClick={this.scrollToMyRef}
                                        className="rightPartBtn">
                                        Tìm vé
                                </button>
                                </div>

                                <div
                                    style={{ marginBottom: "10px" }}
                                    className="row no-gutters">
                                    <div className="col-1">
                                        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17 3H3C1.89543 3 1 3.89543 1 5V19C1 20.1046 1.89543 21 3 21H17C18.1046 21 19 20.1046 19 19V5C19 3.89543 18.1046 3 17 3Z" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M14 1V5" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6 1V5" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M1 9H19" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="col">
                                        <p className="p3">
                                            {/* Thời gian mở cửa: {textAvailableDayVN} */}
                                            Thời gian mở cửa: {textAvailableDay}
                                        </p>
                                    </div>
                                </div>

                                <div
                                    style={{ marginBottom: "10px" }}
                                    className="row no-gutters">
                                    <div className="col-1">
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M11 5V11L15 13" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="col">
                                        <p className="p4">
                                            {place.openingHours}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    style={{ marginBottom: "10px" }}
                                    className="row no-gutters">
                                    <div className="col-1">
                                        <svg width="22" height="22" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14 7.5C14 12.5556 7.5 16.8889 7.5 16.8889C7.5 16.8889 1 12.5556 1 7.5C1 5.77609 1.68482 4.12279 2.90381 2.90381C4.12279 1.68482 5.77609 1 7.5 1C9.22391 1 10.8772 1.68482 12.0962 2.90381C13.3152 4.12279 14 5.77609 14 7.5Z" 
                                            stroke="#FF7062" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M7.50016 9.66683C8.69678 9.66683 9.66683 8.69678 9.66683 7.50016C9.66683 6.30355 8.69678 5.3335 7.50016 5.3335C6.30355 5.3335 5.3335 6.30355 5.3335 7.50016C5.3335 8.69678 6.30355 9.66683 7.50016 9.66683Z" 
                                            stroke="#FF7062" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="col">
                                        <p className="p6">
                                            {place.address}
                                        </p>
                                    </div>
                                </div>
                                <hr style={{ border: "1.5px solid #E3E3E3", borderRadius: "2px" }} />

                                <div
                                    style={{ marginBottom: "10px" }}
                                    className="row no-gutters">
                                    <div className="col-1">
                                        <svg
                                            className="rightPartIcon"
                                            width="13" height="23" viewBox="0 0 13 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.5 1.875V21.125" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10.875 5.375H4.3125C3.50027 5.375 2.72132 5.69766 2.14699 6.27199C1.57266 6.84632 1.25 7.62527 1.25 8.4375C1.25 9.24973 1.57266 10.0287 2.14699 10.603C2.72132 11.1773 3.50027 11.5 4.3125 11.5H8.6875C9.49973 11.5 10.2787 11.8227 10.853 12.397C11.4273 12.9713 11.75 13.7503 11.75 14.5625C11.75 15.3747 11.4273 16.1537 10.853 16.728C10.2787 17.3023 9.49973 17.625 8.6875 17.625H1.25" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="col">
                                        <p className="p5">
                                            Không hoàn hủy vé
                        </p>
                                    </div>
                                </div>

                                <div
                                    style={{ marginBottom: "10px" }}
                                    className="row no-gutters">
                                    <div className="col-1">
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 8V1H17V8" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M5 17H3C2.46957 17 1.96086 16.7893 1.58579 16.4142C1.21071 16.0391 1 15.5304 1 15V10C1 9.46957 1.21071 8.96086 1.58579 8.58579C1.96086 8.21071 2.46957 8 3 8H19C19.5304 8 20.0391 8.21071 20.4142 8.58579C20.7893 8.96086 21 9.46957 21 10V15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H17" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M17 13H5V21H17V13Z" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="col">
                                        <p className="p6">
                                            Xuất trình vé điện tử hoặc in voucher
                                        </p>
                                    </div>

                                </div>
                                
                            </div>
                        </div>

                    </div >
                    <MorePlace myPlace={place} />
                </div>
            );
        } else {
            return (
                <Redirect to='/' />
            )
        }
    }

}

// export default Detail;
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
export default (connect(mapStateToProps, mapDispatchToProps)(Detail));