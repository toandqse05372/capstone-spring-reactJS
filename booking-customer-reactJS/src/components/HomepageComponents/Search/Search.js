import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import './style.css';
import { withRouter } from 'react-router-dom';
import LogoSearch from '../../../img/LogoSearch.png';
import search from '../../../img/search.png';
// import { Form } from 'react-bootstrap';
// import callApi from '../../../config/utils/apiCaller';
import MyMul from './MyMul';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Fade from 'react-reveal/Fade';

//search
class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // toggleFilter: true, //Boolean handle filter appear or not
            txtParkName: '',    //Name Seach
            listCity: [],       //List ID City filter
            listCategories: [],  //List ID Category filter
            pathLink: "",
            cityMul: [],
            catMul: [],
            show: false
        }
    }

    //Handle filter appear or not
    toggleFilter = () => {
        this.setState({
            toggleFilter: !this.state.toggleFilter
        })
    }
    handleClick = () => {
        this.setState({ show: !this.state.show });
    }
    searchPathLink = () => {
        // const { cityMul, catMul } = this.state;
        var pathLink = '/searchedPlace';
        // console.log(this.removeSpace(this.state.txtParkName));
        // const pathName = `?name=${this.state.txtParkName}`
        const pathName = `?name=${this.removeSpace(this.state.txtParkName)}`
        const pathListCity = `?listCityID=${this.state.cityMul.join()}`
        const pathListCat = `?listCatID=${this.state.catMul.join()}`

        if (this.state.txtParkName !== "") {
            pathLink += pathName;
            if (this.state.cityMul.length > 0) {
                pathLink += pathListCity;
            }
            if (this.state.catMul.length > 0) {
                pathLink += pathListCat;
            }
        }
        else if (this.state.txtParkName === "") {
            if (this.state.cityMul.length > 0) {
                pathLink += pathListCity;
            }
            if (this.state.catMul.length > 0) {
                pathLink += pathListCat;
            }
        }
        // console.log(pathLink);
        // console.log(pathLink);
        return pathLink;
    }

    //Set value of seach name


    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value,
        })
    }

    isValid = (str) => {
        return /^[a-zA-Z0-9 ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]{0,225}$/g.test(str);
        // ~!@#$%^&*()-_=+[]\{}|;':",./<>?
    }

    removeSpace = (str) => {
        return str.replace(/\s+/gi, " ");
    }

    //After click search set Name Seached to local storage
    onSubmitSearch = (e) => {
        e.preventDefault();
        if (this.state.cityMul.length !== 0 || this.state.catMul.length !== 0) {
            this.props.history.push(`${this.searchPathLink()}`);
        }
        // var str = this.state.txtParkName.replace(/ +(?= )/g, ' ');

        else if (this.state.txtParkName === "" || this.removeSpace(this.state.txtParkName) === " ") {
            toast.error('Vui lòng điền nơi bạn muốn tìm kiếm!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (this.isValid(this.state.txtParkName) === false) {
            toast.error('Vui lòng không điền kí tự đặc biệt!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            this.props.history.push(`${this.searchPathLink()}`);
        }
    }

    setmMul = (cityMul, catMul) => {
        this.setState({
            cityMul,
            catMul
        }, () => {
        });

    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClickDropDown, false)
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickDropDown, false)
    }
    handleClickDropDown = (e) => {
        if (this.node.contains(e.target)) {
            //u click
            return;
        }
        this.setState({
            show: false
        })
    }

    render() {
        // const { toggleFilter } = this.state;
        // console.log(txtParkName);
        this.searchPathLink();
        return (
            <div>
                {/* <ToastContainer /> */}
                <form
                    onSubmit={this.onSubmitSearch}
                    className="d-block d-flex">
                    <div className="fields d-block d-flex">
                        <div className="textfield-search two-third">
                            <img src={LogoSearch} alt="?" width="54.467" height="43.84" />
                        </div>
                        <div className="textfield-search one-third">
                            <input
                                type="text"
                                maxLength="225"
                                className="form-control"
                                placeholder="Tìm kiếm hoạt động hoặc điểm đến"
                                name="txtParkName"
                                // defaultValu={txtParkName}
                                onChange={this.onChange}
                            />
                        </div>
                        <div ref={node => this.node = node}
                            className="select-wrap one-third">
                            <div 
                                // onClick={this.toggleFilter}
                                onClick={this.handleClick}
                                style={{ paddingLeft: "0px" }}
                                className="form-control">
                                <div  className="filterPanel">
                                    <span>
                                        Bộ lọc
                                    </span>
                                    <span style={{ marginLeft: "10px" }}>
                                        <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.34546 1L7.34546 7L13.3455 1" stroke="#A5A5A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <Fade duration={500} when={this.state.show}>
                                <div 
                                    style={{ display: this.state.show ? "" : "none" }}
                                    className="filterBox">
                                    <div className="row">
                                        <div className="col-12">
                                            <MyMul showAnimate={this.state.show} setmMul={this.setmMul} />
                                        </div>
                                    </div>
                                </div>
                            </Fade>
                            {/* <button
                                className="btn btn-success my-5"
                                type="button"
                                onClick={this.handleClick}
                            >
                                {this.state.show ? 'Hide' : 'Show'} Message
                            </button> */}
                            {/* <div
                                style={{ visibility: toggleFilter ? "hidden" : "visible" }}
                                className="filterBox">
                                <div className="row">
                                    <div className="col-12">
                                        <MyMul setmMul={this.setmMul} />
                                    </div>
                                </div>
                            </div> */}
                        </div>

                    </div>
                    {/* <Link
                        // onClick={this.onSubmitSearch}
                        className="search-submit"
                        // to="/searchedPlace"
                        // to={`/searchedPlace?name=${txtParkName}?name=${txtParkName}?name=${txtParkName}`}
                        // to={{
                        //     pathname: '/searchedPlace',
                        //     query: queryParameters
                        //   }}
                        // to={this.state.pathLink === "" ? "/searchedPlace" : this.state.pathLink}
                        to={this.searchPathLink}
                    > */}
                    <button
                        type="submit"
                        // onClick={this.onSubmitSearch}
                        className="searchbtn search-submit"
                    // className="search-submit"
                    >
                        <img src={search}
                            alt="Fail !"
                            width="17.76"
                            height="17.76"
                        /> &nbsp; Tìm Kiếm
                        </button>
                    {/* </Link> */}
                </form>

            </div >
        );
    }

}

// export default Search;
const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
