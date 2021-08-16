import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.css';
import Search from '../Search/Search';
import Flip from 'react-reveal/Flip';

const classes = 'masthead mg-10'

//Home Page's banner
class Banner extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const { loader } = this.props;
        var layer = loader.loading;
        return (
            <header className={classes}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center ">
                        <div className="col-12 text-center">
                            <Flip when={layer === false ? true : false} duration={700} top cascade>
                                <h1 className="introduction">
                                    Tự do khám phá trải nghiệm du lịch
                                    </h1>
                                <p className="des">Khám phá và đặt trước các hoạt động du lịch đặc sắc với giá độc quyền</p>
                            </Flip>
                            <div className="block-17">
                                <Search />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }

}


const mapStateToProps = state => {
    return {
        loader: state.Loader,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
