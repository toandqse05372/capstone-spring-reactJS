import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from '../../components/Menu/Menu';
import Footer2 from '../../components/Footer/Footer2/Footer2';
import fileNotFound from '../../img/Group (2).png';
import { Link } from 'react-router-dom';

//Home page
class NotFoundPage extends Component {

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
                                    <img src={fileNotFound}
                                        width="70%"
                                        height="auto"
                                        alt="FAIL TO LOAD" />
                                </div>
                                <div className="notlogin col">
                                    <h1>404 Not Found</h1>
                                    <h1>Đường dẫn không tồn tại</h1>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <div className="row">
                                        <div className=" col">
                                            <Link to="/"><p className="notloginTOLOGIN">Về trang chủ</p></Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(NotFoundPage);
