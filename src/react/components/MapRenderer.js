// COMPONENT : render a map component
import React, {PropTypes} from 'react';
import _ from 'lodash';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import styles from '../style/index';

// Controller component
class MapRenderer extends React.Component {

    // constructor
    constructor(props){
        super(props);

        //handle what to render
        this.state= {
            renderMarkers: true,
            idTrack: 0,
        };

        // bind method
        this.getMarkerClickHandler = this.getMarkerClickHandler.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.extractValidMarkers = this.extractValidMarkers.bind(this);
    }

    // zoom on markers on update
    componentDidUpdate() {

        if(this.props.markers.length == 0)
            return;

        this.mapRef.fitToCoordinates(
            this.extractValidMarkers(this.props.markers),
            false, // not animated
        );

    }

    // provide a click handler on marker with id
    getMarkerClickHandler(id) {
        return () => {
            // toggle to rendering track
            this.setState({
                renderMarkers: false,
                idTrack: id,
            });
        };
    }

    // get valid markers from props
    extractValidMarkers(markers) {
        return markers.filter( marker => {
            return marker.latitude && marker.longitude;
        });
    }

    // render markers
    renderMarkers(){

        // no data
        if( this.props.markers.length == 0) {
            return null;
        }


        // extract valid markers
        const validMarkers = this.extractValidMarkers(this.props.markers);

        // return map markers
        return validMarkers.map( marker => (
                <MapView.Marker
                    key={ marker.idPI}
                    coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                }}
                    pinColor='red'
                    onPress={this.getMarkerClickHandler( marker.idTrack) }
                />
        ));
    }

    // render a track
    renderTrack(idTrack){

        // no tracks
        if( this.props.tracks.length == 0) {
            return null;
        }

        // find the track by id
        const track = _.find(this.props.tracks, function(track) {
            return track.Route.id_route === idTrack;
        });

        // convert Points array to coordinate array
        const coords = _.map(track.Points, point => {
            return {
                latitude: point.latitude,
                longitude: point.longitude,
            };
        });

        return (
            <View>
                <MapView.Polyline coordinates={coords}/>
            </View>
        );
    }

    // choose what to render in the map
    renderMapData(){
        if(this.state.renderMarkers) {
            return this.renderMarkers();
        }
        else {
            return this.renderTrack( this.state.idTrack);
        }
    }

    // render
    render(){
        return(
            <MapView
                style={styles.mapRenderer}
                ref={(ref) => { this.mapRef = ref }}
            >
                {this.renderMapData()}
            </MapView>
        );
    }

}

// required
MapRenderer.propTypes = {
  //tracks: PropTypes.array.isRequired(),
};

// export
export default MapRenderer;