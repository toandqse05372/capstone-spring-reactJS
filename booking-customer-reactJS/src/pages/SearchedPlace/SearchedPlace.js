import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Menu from '../../components/Menu/Menu';
import ListPlaceSearched from '../../components/SearchPlaceComponents/ListSearched/ListPlaceSearched'
import Footer2 from '../../components/Footer/Footer2/Footer2';
import FullPageLoader from '../../components/FullPageLoader/FullPageLoader';
class SearchedPlace extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchedName: null,
            listCtiId: [],
            listCatId: []
        }
    }

   componentDidMount=()=>{
    window.scrollTo(0, 0)
   }
    
    render() {
        return (
            <div
            style={{background: "#F2F2F2"}}
            >
                <Menu />
                <ListPlaceSearched />
                <Footer2 />
                <FullPageLoader />
            </div>
        );
    }

}

export default SearchedPlace;
