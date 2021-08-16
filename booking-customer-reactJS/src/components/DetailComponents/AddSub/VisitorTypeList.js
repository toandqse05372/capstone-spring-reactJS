import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchVisitor2 } from '../../../actions/index';
import VisitorTypeItem from './VisitorTypeItem'
import './AddSub.css';
class VisitorList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visitorTypeDetail: [],
        }
    }

    showTicketTypes = (arr) => {
        const { visitorType } = this.props;
        var result = [];
        if (arr !== null) {
            if (arr.length > 0) {
                result = arr.map((item, index) => {
                    var updateIndex = visitorType.findIndex(itemUpdate => itemUpdate.visitorTypeId === item.id)
                    return (
                        <VisitorTypeItem key={index} visitorType={visitorType[updateIndex]} index={index} item={item} />
                    );
                });
            }

            else if (arr.length === 0) {
                return (
                    <p>Not Found</p>
                );
            }
        }

        return result;
    }

    render() {
        const { item } = this.props;

        return (
            <div>
                {this.showTicketTypes(item)}
            </div>
        );
    }


    onUpdateQuantity = (item, quantity) => {
        const { fetchVisitor2 } = this.props;
        if (quantity >= 0) {
            this.setState({
                quantity: quantity,
                myId: item.id,
                price: item.price
            }
                , () => {
                    fetchVisitor2(this.state.myId, this.state.quantity, this.state.price);
                }
            );

        }
    }
}

const mapStateToProps = state => {
    return {
        visitorType: state.Ticket
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchVisitor2: (id, qty, price) => {
            dispatch(fetchVisitor2(id, qty, price))
        }
    }
}

// export default MyCounter;
export default connect(mapStateToProps, mapDispatchToProps)(VisitorList);
