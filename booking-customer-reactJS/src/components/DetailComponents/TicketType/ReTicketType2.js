import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ReTicketType.css';
// import VisitorTypeList from '../AddSub/VisitorTypeList';
import { removeVisitorType, fetchVisitor2, showLoader, hideLoader, showLoaderPart, hideLoaderPart } from '../../../actions/index';
import './TicketType.css';
import { Collapse } from 'react-bootstrap';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import vi from "date-fns/locale/vi";
import TotalPayment from '../TotalPayment/TotalPayment';
// import axios from 'axios'
// import * as Config from '../../../constants/ConfigAPI';
import callApi from '../../../config/utils/apiCaller';
import VisitorTypeItem from '../AddSub/VisitorTypeItem';
import PartLoader from '../../FullPageLoader/PartLoader';
import axios from 'axios'
import * as Config from '../../../constants/ConfigAPI';
import Fade from 'react-reveal/Fade';

// import format from 'react';
registerLocale("vi", vi);
const radioToolbar = "radio-toolbar";


class ReTicketType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dob: { value: '1-1-1' },
            startDate: new Date(),
            open: false,
            apple: "aa",
            activeDay: [0, 1],
            ticketTypeId: 0,
            ticketName: 'default',
            defaultId: null,
            ticketTypeState: [],
            typeChoosing: 1,
            orderDetail: [],
            total: 0,
            listTicketTypeByDay: null
        }
    }

    handleInput = event => {
        const { name, value } = event.target;
        const newState = { ...this.state[name] }; /* dummy object */
        newState.value = value;
        this.setState({ [name]: newState });
    }

    handleChange = date => {
        this.props.removeVisitorType()
        this.setState({
            startDate: date,
            open: false
        }, () => {
            this.apiGetTicketTypeByDay();
        });

    };

    apiGetTicketTypeByDay = async () => {
        const { showLoaderPart, hideLoaderPart } = this.props;
        showLoaderPart();
       
        await axios.get(`${Config.API_URL}/visitorType/ticketType`, {
            params: {
                ticketTypeId: this.state.ticketTypeId,
                date: this.formatDate(this.state.startDate)
            }
        }).then(res => {
            console.log(res.data);
            this.setState({
                listTicketTypeByDay: res.data
            })
            hideLoaderPart();
        }).catch(error => {
            hideLoaderPart();
        });
    }

    //hide day of calender
    isWeekday = (Date) => {
        const { activeDay } = this.state;
        const day = Date.getDay();
        var fullList = [0, 1, 2, 3, 4, 5, 6];
        fullList = fullList.filter(val => !activeDay.includes(val));
        return day !== fullList[0] && day !== fullList[1] && day !== fullList[2] &&
            day !== fullList[3] && day !== fullList[4] && day !== fullList[5] && day !== fullList[6]
    }

    formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [day, month, year].join('/');
    }

    setDefaultTicketType = (ticketTypes) => {
        if (ticketTypes.length > 0) {
            ticketTypes.map((ticketType, index) => {
                if (index === 0) {
                    this.setState({
                        ticketTypeId: ticketType.id,
                        ticketName: ticketType.typeName
                    }, () => {
                        this.apiGetTicketTypeByDay()
                    })
                }
                return (
                    null
                )
            });
        }
    }

    getNearestDate(weekdays) {
        weekdays.sort();
        var i;
        for (i = 1; i <= 7; i++) {
            var nextday = new Date();
            nextday.setDate(nextday.getDate() + i)
            if (weekdays.includes(nextday.getDay())) {
                return nextday
            }
        }
    }

    componentDidMount = () => {
        var { ticketType, weekDays } = this.props;
        this.setState({
            activeDay: weekDays
        }, () => {
            var activeDay = this.state.activeDay.sort();
            const today = new Date().getDay()
            if (activeDay.indexOf(today) !== -1) {
                this.setState({
                    startDate: new Date()
                })
            } else {
                this.setState({
                    startDate: this.getNearestDate(this.state.activeDay)
                })
            }
        })
        this.props.removeVisitorType();
        this.setDefaultTicketType(ticketType);
        // this.apiGetTicketTypeByDay();
    }

    //reset order when click
    resetOrder = (e) => {
        this.props.removeVisitorType()
        this.setState({
            total: 0
        })
        var ticketTypeId = e.target.href.split('#')[1];
        var ticketName = e.target.innerHTML + "";
        // console.log(ticketName);
        if (ticketTypeId) {
            this.setState({
                ticketTypeId: ticketTypeId,
                ticketName: ticketName
            }, () => {
                this.apiGetTicketTypeByDay();
            })
        }
    }

    getTotalMoney = () => {
        var result = 0;
        var { ticket } = this.props
        for (var i = 0; i < ticket.length; i++) {
            result = result + ticket[i].myPrice * ticket[i].quantity
        }
        return result;
    }

    changeTicketType = (ticketTypeId) => {
        this.apiGetTicketTypeByDay(ticketTypeId);
    }

    showTicketTypeName = (ticketTypes) => {
        var result = null;
        if (ticketTypes.length > 0) {
            result = ticketTypes.map((ticketType, index) => {
                if (index === 0) {
                    // console.log(ticketType.id)
                    return (
                        <li key={index} className="nav-item">
                            <a className="nav-link active"
                                onClick={this.resetOrder}
                                href={`#${ticketType.id}`} role="tab" data-toggle="tab">
                                {ticketType.typeName}
                            </a>
                        </li>
                    );
                } else {
                    return (
                        <li key={index} className="nav-item" >
                            <a onClick={this.resetOrder} className="nav-link" href={`#${ticketType.id}`} role="tab" data-toggle="tab" >
                                {ticketType.typeName}
                            </a>
                        </li>
                    );
                }
            });
        }
        return result;
    }

    showVisitorType = (listVisitorType) => {
        var result = null;
        const { reduxVisitorType } = this.props;

        if (listVisitorType !== null)
            if (listVisitorType.length > 0) {
                result = listVisitorType.map((item, index) => {
                    // console.log(item)
                    var updateIndex = reduxVisitorType.findIndex(itemUpdate => itemUpdate.visitorTypeId === item.id)
                    return (
                        // <div key={index} className="tab-pane active" id={`${ticketType.id}`}>
                        //     <VisitorTypeList id={ticketType.id} item={ticketType.visitorTypes} />
                        // </div>
                        <div key={index}>
                            {/* {item.typeName} */}
                            {/* <VisitorTypeItem key={index} index={index} item={item} /> */}
                            <VisitorTypeItem key={index} visitorType={reduxVisitorType[updateIndex]} index={index} item={item} />
                        </div>
                    );
                });
            }
        return result;
    }

    render() {
        const { ticketTypeId, ticketName, startDate, listTicketTypeByDay } = this.state;
        const { ticketType, place } = this.props;
        const ExampleCustomInput = ({ value, onClick }) => (
            <button className="example-custom-input" onClick={onClick}>
                {value}
            </button>
        );
        var dateType = {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        };

        if (this.state.startDate !== null) {
            var prnDt = this.state.startDate.toLocaleDateString('vi', dateType);
        }

        var total = this.getTotalMoney();;
        return (
            <div>
                <div
                    className="ticketBox"
                    style={{ fontFamily: 'Inter' }}
                >
                    <Fade>
                        <div className="row no-gutters">
                            <div className="col-5">
                                <div
                                    className="datepickerBtn"
                                    aria-controls="example-collapse-text"
                                    aria-expanded={this.state.open}
                                >
                                    <div
                                        style={{ padding: "10px" }}
                                        className="row no-gutters">
                                        <div className="col">
                                            <h6
                                                className="myTitle1"
                                                style={{ marginBottom: "0px" }}
                                            >
                                                Vui Lòng chọn ngày tham quan
                                    </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-5"
                                style={{
                                    border: "2px solid #E3E3E3",
                                    borderRadius: "10px"
                                }}
                            >
                                <div
                                    className="datepickerBtn"
                                    onClick={() => this.setState({ open: !this.state.open })}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={this.state.open}
                                >
                                    <div
                                        style={{ padding: "10px" }}
                                        className="row no-gutters">
                                        <div className="col myTitle">
                                            <h6
                                                className="myTitle"
                                                style={{ marginBottom: "0px", color: "#FF7062", textAlign: "center" }}
                                            >
                                                {prnDt}
                                            </h6>
                                        </div>
                                        <div className="col-2">
                                            &nbsp;
                                        <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 0.999999L11 12L21 1" stroke="#FF7062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </Fade>
                    <div className="row no-gutters"
                        style={{ marginTop: "10px" }}>
                        <div className="col-4">
                        </div>
                        <div

                        >
                            <Collapse in={this.state.open}>
                                <div
                                    id="example-collapse-text">
                                    <DatePicker
                                        locale="vi"
                                        filterDate={this.isWeekday}
                                        selected={this.state.startDate}
                                        onChange={this.handleChange}
                                        dateFormat="dd/MM/yyyy"
                                        showMonthDropdown
                                        showYearDropdown
                                        yearDropdownItemNumber={15}
                                        scrollableYearDropdown
                                        minDate={new Date()}
                                        customInput={<ExampleCustomInput />}
                                        inline
                                        calendarClassName="myCalender"
                                    />
                                </div>
                            </Collapse>
                        </div>
                    </div>
                    <div className="row no-gutters">
                        <div className="col-12">
                            <h3
                                style={{ paddingLeft: "10px" }}
                                className="myTitle">Loại vé
                        </h3>
                        </div>
                        <div className={`col-12 ${radioToolbar}`}>
                            <div className="row">
                                <div className="col-12">
                                    <ul className="nav nav-pills" role="tablist">
                                        {this.showTicketTypeName(ticketType)}
                                    </ul>
                                    <PartLoader />
                                    {this.showVisitorType(listTicketTypeByDay)}

                                </div>
                            </div>

                        </div>
                    </div>
                    <br></br>
                    <hr style={{ border: "1.5px solid #E3E3E3", borderRadius: "2px" }} />
                    <div className="row">
                        <div className="col-5">
                        </div>
                        <div className="col-7">
                            {/* {total} */}
                            <TotalPayment
                                place={place}
                                ticketTypeID={ticketTypeId}
                                ticketName={ticketName}
                                totalPayment={total}
                                redemptionDate={startDate}
                            />
                        </div>
                    </div>
                </div >
            </div>


        );
    }
}

const mapStateToProps = state => {
    return {
        ticket: state.Ticket,
        reduxVisitorType: state.Ticket
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        removeVisitorType: () => {
            dispatch(removeVisitorType())
        },
        fetchVisitor2: (id, qty, price) => {
            dispatch(fetchVisitor2(id, qty, price))
        },
        showLoader: () => {
            dispatch(showLoader())
        },
        hideLoader: () => {
            dispatch(hideLoader())
        },
        showLoaderPart: () => {
            dispatch(showLoaderPart())
        },
        hideLoaderPart: () => {
            dispatch(hideLoaderPart())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReTicketType);

// export default TicketType;
