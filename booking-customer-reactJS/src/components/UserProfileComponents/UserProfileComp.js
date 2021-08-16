import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserProfile.css';
import { showLoader, hideLoader } from '../../actions/index';



class UserProfileComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
         
        }
    }

    render() {   
        return (
          <div>IDK WHY THIS EXIST, BUT IF NOT IT WOULD'T WORKS</div>
      );
    }

}

// export default UserProfileComp;
const mapStateToProps = state => {
    return {
        loggedUser: state.User
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileComp);