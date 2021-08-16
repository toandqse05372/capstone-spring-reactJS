import React, { Component } from 'react';
import { connect } from 'react-redux';
import './NotLogin.css';
import Menu from '../../components/Menu/Menu';
import Footer2 from '../../components/Footer/Footer2/Footer2';
import failToSearchPic from '../../img/Group.png';
import { Link } from 'react-router-dom';

//Home page
class NotLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }



    render() {
        const { loader } = this.props;
        return (
            <div>
                <Menu />
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className="container"
                    style={{ fontFamily: 'Inter', }}>
                    <div className='row '>
                        <div style={{ visibility: loader.loading === true ? "hidden" : "visible" }} className="col-12">
                            <div className="row">
                                <div className="col">
                                    <img src={failToSearchPic}
                                        width="70%"
                                        height="auto"
                                        alt="FAIL TO LOAD" />
                                </div>
                                <div className="notlogin col">
                                    <h1>Chức năng này cần đăng nhập để thực hiện</h1>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <div className="row">
                                        <div className=" col">
                                            <Link to="/login"><p className="notloginTOLOGIN">Đăng nhập</p></Link>
                                        </div>
                                        <div className=" col">
                                            <Link to="/"><p className="notloginTOHOME">Về trang chủ</p></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer2 />
            </div>
        );
    }

}

// export default HomePage;

const mapStateToProps = state => {
    return {
        loader: state.Loader,
        UserDetail: state.User,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotLogin);
