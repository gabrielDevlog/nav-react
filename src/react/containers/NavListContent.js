// Screen : Navigations list
import React, {PropTypes} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import navList from '../../logic/navList';
import Loading from '../components/Loading.js';
import MapRenderer from '../components/MapRenderer';
import styles from '../style';

// Controller component
class NavListContent extends React.Component {

    // constructor
    constructor(props){
        super(props);

    }

    // render
    render(){
        return(
            <View style={styles.mapContainer}>
                <Loading show={this.props.isFetching} />
                <MapRenderer tracks={this.props.tracks} markers={this.props.starts}/>
            </View>
        );
    }
}

// connect data from store
const mapStateToProps = state => {
    return {
        tracks: state.navList.tracks,
        starts: state.navList.starts,
        isFetching: state.navList.isFetching,
        iduser: state.user.iduser,
    };
};

// connect dispatch to store
const mapDispatchToProps = dispatch => {
    return {
    };
};

// connection du composant à redux
export default connect(mapStateToProps, mapDispatchToProps)(NavListContent);