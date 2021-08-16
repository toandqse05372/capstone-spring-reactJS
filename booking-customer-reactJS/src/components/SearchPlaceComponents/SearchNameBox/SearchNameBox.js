import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SearchNameBox.css';
import { withRouter } from 'react-router-dom';
// import LogoSearch from '../../../img/LogoSearch.png';
// import search from '../../../img/search.png';
// import MyMul from './MyMul';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//search
class SearchNameBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleFilter: true, //Boolean handle filter appear or not
            txtParkName: '',    //Name Seach
            listCity: [],       //List ID City filter
            listCategories: [],  //List ID Category filter
            pathLink: "",
            cityMul: [],
            catMul: []
        }
    }

    //Handle filter appear or not
    toggleFilter = () => {
        this.setState({
            toggleFilter: !this.state.toggleFilter
        })
    }

    searchPathLink = () => {
        // const { cityMul, catMul } = this.state;
        var pathLink = '/searchedPlace';
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
        else if (this.state.cityMul.length > 0) {
            pathLink += pathListCity;
        }
        else if (this.state.catMul.length > 0) {
            pathLink += pathListCat;
        }
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
        // console.log(this.state.cityMul.length);
        if (this.state.cityMul.length !== 0 || this.state.catMul.length !== 0) {
            // console.log(this.searchPathLink());
            this.props.history.push(`${this.searchPathLink()}`);
        }
        var str = this.state.txtParkName.replace(/ +(?= )/g, ' ');
        // console.log(str);
        if (this.state.txtParkName === "" || this.removeSpace(this.state.txtParkName) === " ") {
            toast.error('Vui lòng điền nơi bạn muốn tìm kiếm!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if (this.isValid(this.state.txtParkName) === false) {
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
            // this.props.history.push(`${this.searchPathLink()}`);              
            if (this.props.location.pathname === "/searchedPlace") {
                // console.log("lmao");
                this.props.history.push(`${this.searchPathLink()}`);
                window.location.reload();
            } else {
                this.props.history.push(`${this.searchPathLink()}`);
            }
        }
    }

    setmMul = (cityMul, catMul) => {
        this.setState({
            cityMul,
            catMul
        }, () => {
        });

    }

    render() {
        // const { toggleFilter, txtParkName } = this.state;
        // const { cityMul, catMul } = this.state;
        // var name = '';
        // const answer_array = this.props.location.search.split('?');
        // for (let index = 0; index < answer_array.length; index++) {
        //     const element = answer_array[index];
        //     if (element.split("=")[0] === "name") {
        //         name = element.split("=")[1]
        //     }
        // }
        // const searchName = this.props.location.search.split("=");
        // var searchNameAfterSpilit = null;
        // if (searchName[0] === "?name") {
        //     console.log(searchName[1])
        //     searchNameAfterSpilit = searchName[1]
        // }
        return (
            <div>
                {/* <ToastContainer /> */}
                <form
                    onSubmit={this.onSubmitSearch}
                    className="d-flex">
                    <div className="">
                        <div className="">
                            <input
                                type="text"
                                maxLength="225"
                                className="searchSubNavBar"
                                placeholder="Tìm hoạt động hoặc điểm đến"
                                name="txtParkName"
                                // defaultValu={txtParkName}
                                onChange={this.onChange}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        // onClick={this.onSubmitSearch}
                        className="subNabSearchBtn"
                    >
                        {/* <img src={search}
                            alt="Fail !"
                            width="14"
                            height="14"
                        /> */}
                        <svg className="svgLOGO" width="17" height="18" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.1111 23.4839C18.2476 23.4839 23.2222 18.6199 23.2222 12.6197C23.2222 6.61961 18.2476 1.75555 12.1111 1.75555C5.97461 1.75555 1 6.61961 1 12.6197C1 18.6199 5.97461 23.4839 12.1111 23.4839Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M26 26.2003L19.9583 20.2929" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchNameBox));
