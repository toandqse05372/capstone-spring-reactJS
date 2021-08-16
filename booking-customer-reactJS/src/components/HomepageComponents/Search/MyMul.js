import React, { Component } from 'react';
import { connect } from 'react-redux';
import callApi from '../../../config/utils/apiCaller';
import './MyMul.scss';
import { showLoader, hideLoader } from '../../../actions';
import Flip from 'react-reveal/Flip';

class Checkbox extends React.Component {
    static defaultProps = {
        checked: false //checked value of checkbox
    }
    render() {
        return (
            <div
                style={{ paddingRight: "10px" }}
                className="box1">
                <input
                    // id="one"
                    type={this.props.type}
                    name={this.props.name}
                    checked={this.props.checked}
                    onChange={this.props.onChange}
                />
                <span className="check"></span>

            </div>
        );
    }
}

class MyMul extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCity: [],               //Llist contain all City
            listCategory: [],           //List contain all Category
            checkedCity: new Map(),     //Create Map state item for City Group Checkbox
            checkedCate: new Map(),     //Create Map state item for Category Group Checkbox
            ListIDFoSend: [],           //List city ID for send to seached page
            ListIDFoSendCat: [],        //List Cat ID for send to seached page
        };
    }

    //Get all City and Category by API
    getCitysAndCategories = async () => {
        const { showLoader, hideLoader } = this.props;
        //get City list
        showLoader();
        await callApi('city', 'GET', null)
            .then(res => {
                this.setState({
                    listCity: res.data
                })
            }).catch(function (error) {
                if (error.response) {
                    // console.log(error.response.data);
                }
            });
        //get Categories list
        await callApi('categories', 'GET', null)
            .then(res => {
                this.setState({
                    listCategory: res.data
                })
                // console.log(res);
                hideLoader();
            }).catch(function (error) {
                if (error.response) {
                    // console.log(error.response.data);
                }
            });
    }

    //Call
    componentDidMount = () => {
        // this.getCitysAndCategories();
    }

    //Handle set check/checked & add to list of City ID
    handleChange = (id) => e => {
        const item = e.target.name;
        const isChecked = e.target.checked;
        if (e.target.checked === true) {
            this.setState({
                ListIDFoSend: [...this.state.ListIDFoSend, id]
            }, () => {
                this.props.setmMul(this.state.ListIDFoSend, this.state.ListIDFoSendCat);

            });
        } else {
            this.setState({
                ListIDFoSend: this.state.ListIDFoSend.filter(temp => temp !== id)
            }, () => {
                this.props.setmMul(this.state.ListIDFoSend, this.state.ListIDFoSendCat);

            })
        }
        this.setState({
            checkedCity: this.state.checkedCity.set(item, isChecked)
        });
    };

    //Handle set check/checked & add to list of Cate ID
    handleChange2 = (id) => e => {
        const item = e.target.name;
        const isChecked = e.target.checked;
        if (e.target.checked === true) {
            this.setState({
                ListIDFoSendCat: [...this.state.ListIDFoSendCat, id]
            }, () => {
                this.props.setmMul(this.state.ListIDFoSend, this.state.ListIDFoSendCat);
            });

        } else {
            this.setState({
                ListIDFoSendCat: this.state.ListIDFoSendCat.filter(temp => temp !== id)
            }, () => {
                this.props.setmMul(this.state.ListIDFoSend, this.state.ListIDFoSendCat);
            })
        }
        this.setState({
            checkedCate: this.state.checkedCate.set(item, isChecked)
        });
    };

    //Set new map to clear al checkbox
    clearAllCheckboxes = () => {
        const clearCheckedItems = new Map();
        this.setState({
            checkedCity: clearCheckedItems,
            checkedCate: clearCheckedItems,
            ListIDFoSend: [],
            ListIDFoSendCat: []
        });
    };


    render() {
        const { listCategory, listCity } = this.props;
        // const checkboxesToRender = this.state.listCity.map(item => {
        const checkboxesToRender = listCity.map(item => {
            return (

                <div
                    style={{
                        textAlign: "left",
                    }}
                    key={item.id} className="col-lg-4 col-md-6 col-sm-6 col-sx-12">

                    <label key={item.id}>
                        <div className="row no-gutters filterItem">
                            <div
                                // style={{ marginLeft: "10px" }}
                                className="col-2"
                            >
                                <Checkbox
                                    name={item.name}
                                    checked={this.state.checkedCity.get(item.name) || false}
                                    onChange={this.handleChange(item.id)}
                                    type="checkbox"
                                />
                            </div>
                            <div className="itemName col"  >
                                {item.name}
                            </div>
                        </div>
                    </label>
                </div>
            );
        });

        // const checkboxesToRender2 = this.state.listCategory.map(item => {
        const checkboxesToRender2 = listCategory.map(item => {

            return (
                <div
                    style={{
                        textAlign: "left",
                        // border: "1px solid red" 
                    }}
                    key={item.id} className="col-lg-4 col-md-6 col-sm-6 col-sx-12">
                    <label key={item.id}>
                        <div className="row no-gutters filterItem">
                            <div
                                className="col-2"
                            // style={{ marginLeft: "10px" }}
                            >
                                <Checkbox
                                    name={item.categoryName}
                                    checked={this.state.checkedCate.get(item.categoryName) || false}
                                    onChange={this.handleChange2(item.id)}
                                    type="checkbox"
                                />

                            </div>
                            <div className="itemName col"
                            >
                                {item.categoryName}
                            </div>
                        </div>
                    </label>
                </div>
            );
        });

        return (
            <div>
                    <h6 className="typeFilter">Thành phố</h6>
                <Flip duration={500} top cascade when={this.props.showAnimate}>
                    <div className="row no-gutters">
                        {checkboxesToRender}
                        {/* {this.showList(this.state.listCity)} */}
                    </div>
                </Flip>
                <h6 className="typeFilter">Danh mục</h6>
                <Flip duration={500} top cascade when={this.props.showAnimate}>
                    <div className="row no-gutters">
                        {checkboxesToRender2}
                        {/* {this.showList(this.state.listCategory)} */}
                    </div>
                </Flip>
                {/* <span
                    style={{ color: "#FF7062", fontWeight: "600" }}
                    type="button"
                    onClick={this.clearAllCheckboxes}>Xóa bộ lọc
                    </span> */}
            </div>
        );
    }

}

// export default MyMul;
const mapStateToProps = state => {
    return {
        loader: state.Loader,
        listCategory: state.Categories,
        listCity: state.City
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
export default connect(mapStateToProps, mapDispatchToProps)(MyMul);