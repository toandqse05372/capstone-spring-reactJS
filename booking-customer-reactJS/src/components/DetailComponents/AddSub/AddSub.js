import React, { Component } from 'react';
import './AddSub.css';
const radioToolbar = "radio-toolbar";

class AddSub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicks: 0,
            clicks2: 0,
            adultTicketTotalPrice: 0,
            childTicketTotalPrice: 0,
        };
    }

    IncrementItem = () => {
        const { adultTicketPrice } = this.props;

        this.setState({
            clicks: this.state.clicks + 1,
        }, () => {
            this.setState({
                adultTicketTotalPrice: this.state.clicks * adultTicketPrice
            })
        }
        );

    }

    DecreaseItem = () => {
        const { adultTicketPrice } = this.props;
        if (this.state.clicks === 0) {
            this.setState({ clicks: this.state.clicks });

        } else {
            this.setState({
                clicks: this.state.clicks - 1,
            }, () => {
                this.setState({
                    adultTicketTotalPrice: this.state.clicks * adultTicketPrice
                })
            }
            );
        }

    }

    render() {
        return (
            <div className="quantityBox">
                <div
                    style={{ textAlign: "center" }}
                    className="row no-gutters">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 quantityBtn"
                        onClick={this.DecreaseItem}>
                        <p>-</p>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 quantityBtn4">
                        <p>{this.state.clicks}</p>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 quantityBtn"
                        onClick={this.IncrementItem}>
                        <p>+</p>
                    </div>
                </div>
            </div >

        );
    }
}

export default AddSub;