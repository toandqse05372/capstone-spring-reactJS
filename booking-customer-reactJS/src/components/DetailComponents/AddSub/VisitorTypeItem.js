import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchVisitor2, removeZeroQuantity,removeZeroQuantity2 } from '../../../actions/index';
import './AddSub.css';
// import axios from 'axios';
// import { isFirstDayOfMonth } from 'date-fns';
// const radioToolbar = "radio-toolbar";
// import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Flip from 'react-reveal/Flip';

class VisitorTypeItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quantity: 0
        }
    }
    convertCurrecyToVnd = (currency) => {
        return currency.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    }
    render() {
        const { item, index, visitorType, loaderPart } = this.props;
        console.log(item);
        var myQuan = 0
        if (visitorType !== undefined) {
            myQuan = visitorType.quantity
        }
        return (
            <Flip duration={index*500} top when={loaderPart.loading === false}>
            <div key={index} style={{ paddingTop: "40px" }} className="row no-gutters">
                <div className="col-12">
                    <div className="row no-gutters" style={{
                        marginBottom: "10px",
                        background: "#FFFFFF",
                        border: "2px solid #E3E3E3",
                        boxSizing: 'border-box',
                        borderRadius: '10px',
                    }}>
                        <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7" style={{ display: "table" }} >
                            <p style={{ width: "300px" }} className="myTitleType">
                                {item.typeName}
                            </p>
                            {/* <span className="myTitleType">Còn lại: {item.remaining - myQuan} vé</span> */}
                            <span className="myTitleType">{this.convertCurrecyToVnd(item.price)}</span>
                        </div>
                        <div className="responsivetable col-lg-3 col-md-4 col-sm-3 col-xs-1" style={{  }} >
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-3 col-xs-4">
                            <div className="row no-gutter quantityBox">
                                <div style={{ textAlign: "center" }} className="row no-gutters">
                                    <div className="quantityBtn col"
                                        onClick={() => this.onUpdateQuantity(item, myQuan - 1)}><button>-</button>
                                    </div>
                                    <div className="quantityBtn2 col">
                                        <p> {myQuan} </p>
                                    </div>
                                    <div className="quantityBtn col"
                                        onClick={() => this.onUpdateQuantity(item, myQuan + 1)}><button>+</button>
                                    </div>
                                </div>
                            </div >
                        </div>
                        {/* ------- */}
                       
                    </div>
                </div>
            </div>
            </Flip>
        );
    }


    onUpdateQuantity = (item, quantity) => {
        const { fetchVisitor2, removeZeroQuantity } = this.props;
        if (quantity >= 0 && quantity <= 10) {
            fetchVisitor2(item.id, quantity, item.price, item.typeName, item.remaining);
            this.forceUpdate()
        }
       
    }

}
const mapStateToProps = state => {
    return {
        // visitorType: state.Ticket
        loaderPart: state.LoaderPart
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchVisitor2: (id, qty, price, name, remaining) => {
            dispatch(fetchVisitor2(id, qty, price, name, remaining))
        }
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VisitorTypeItem);
