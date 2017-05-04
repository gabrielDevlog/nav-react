// API : navigations history
import conf from '../conf';
import _ from 'lodash';

/**
 * Merge 2 tracks on Route, Images, PointInteret & Points indexes
 * @param previousTrack Object track
 * @param newTrack Object track
 * @returns Object merged track
 */
const mergeTracks = (previousTrack, newTrack) => {

    return Object.assign({}, {

        Route: {
            ...previousTrack.Route,
            ...newTrack.Route,
        },
        Images: {
            ...previousTrack.Images,
            ...newTrack.Images,

        },
        PointInteret: {
            ...previousTrack.PointInteret,
            ...newTrack.PointInteret,
        },
        Points: {
            ...previousTrack.Points,
            ...newTrack.Points,
        }
    });
};

/**
 * Recursively fetch all gps data for route idRoute
 * @param idUser integer
 * @param idRoute integer
 * @param lastId integer, optionnal, default -1
 * @param dataTrack Object, optionnal, default {}
 * @returns {Promise.<Object>}
 */
const fetchTrackData = ( idUser, idRoute, lastId = -1, dataTrack = {}) => {

    // url
    let url= conf.serverUrl + 'activeTrack.php';
    url+="?";

    // continue the previous download
    if( lastId > 0) {
        url+= 'mode=moreTrack';
        url+= '&last_id='+lastId;
    }
    // downloading new track
    else {
        url+= 'mode=downloadTrack';
    }

    // url params
    url+= '&user='+idUser;
    url+= '&idTrack='+idRoute;
    console.log(url);
    // http request
    return fetch(url)

    // response to json
    .then( response => response.json())

    // response handling
    .then( response => {

        // get datas
        reponse_code= response['answer_code'];
        reponse_data= response['answer_data'];

        // end of download
        if("downloadTrack_end_0" == reponse_code || "moreTrack_end_0" == reponse_code)
        {
            // merge already downloaded & new datas
            dataTrack = mergeTracks(dataTrack, reponse_data.data);

            // return the final track
            return dataTrack;
        }

        // more datas needs to be downloaded
        else if ("downloadTrack_end_1" == reponse_code || "moreTrack_end_1" == reponse_code)
        {
            // merge already downloaded & new datas
            dataTrack = mergeTracks(dataTrack, reponse_data.data);

            // get last id
            lastIdRecall= reponse_data['last_id'];

            // new upload
            return fetchTrackData(idUser, idRoute, lastIdRecall, dataTrack);
        }

        // handling errors
        else
        {
           throw new Error();
        }
    });
};

export default {

    /**
     * fetch navigations list
     * @param idUser Integer
     * @returns {Promise.<Array>}
     */
    fetchList: idUser => {

        // url
        let url = conf.serverUrl+'userRoute.php';
        url += '?mode=listerRoutes';
        url += '&id='+idUser;

        // fetch from url
        return fetch(url)

        // transform to json
        .then(response => response.json())

        // handle server response
        .then(response => {

            // Server error
            if (response.answer_code != 'listerRoutes_end_code_0') {
                throw Error();
            }

            // convert response data
            let navigations = [];
            const data = response.answer_data;
            for( let i in data) {

                navigations.push({
                    id: parseInt(data[i].id_route),
                    key: parseInt(data[i].id_route),
                    name: data[i].nom_route
                });
            }

            return navigations;
        });
    },

    /**
     * fetch gps data for the 10 last tracks
     * @param idUser Integer
     * @param navigations Array
     * @returns {Array}
     */
    fetch10Tracks: (idUser, navigations) => {

        // no navigations to fetch
        if(navigations.length == 0 ){
            console.warn('navList.api.js -> fetch10Tracks : navigations list is empty');
            return null;
        }

        // Fetching promises array
        const limit = navigations.length - 10;
        const fetchRequests = [];
        for(let i= navigations.length-1; i > limit && i >= 0; i--) {
            fetchRequests.push(
                fetchTrackData(idUser, navigations[i].id)
            );
        }

        // execute & return all promises
        return Promise.all(fetchRequests);
    },

    /**
     * extract starting points from tracks data array
     * @param tracks array of tracks
     * @returns Array
     */
    extractStartingPoints: tracks => {

        // warning no tracks
        if( tracks.length == 0) {
            console.warn('navList.api.js -> extractStartingPoints : tracks list is empty');
            return [];
        }

        return starts = tracks.map( track => {

            if( !track.PointInteret || _.isEmpty(track.PointInteret) ) {
                console.warn('navList.api.js -> extractStartingPoints : tracks has no PointInteret index');
                return {};
            }

            const firstKey = Object.keys( track.PointInteret)[0];

            return {
                latitude: track.PointInteret[firstKey].latitude,
                longitude: track.PointInteret[firstKey].longitude,
                idTrack: track.PointInteret[firstKey].id_route,
                idPI: track.PointInteret[firstKey].id_pointinteret,
            };
        });
    }
}