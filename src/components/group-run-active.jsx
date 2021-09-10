import React from 'react';
import { connect } from 'react-redux';

import ConnectedGpsCoordinates from './Geolocation.jsx'

class GroupRunActive extends (React.Component) {

    render() {
        return ( 
            <div >
               
                <ConnectedGpsCoordinates/>
            {/* For every user in the group, create table */}
                <table className="runActiveTable1">
                        <tr>
                            <td></td>
                            <td>Distance</td>
                            <td>2.3 miles</td>
                        </tr>
                        <tr>
                            <td>Player ID</td>
                            <td>Average Pace</td>
                            <td>7:30</td>
                        </tr>
                        <tr>
                            <td>(Rank)</td>
                            <td>Time</td>
                            <td>8:55</td>
                        </tr>
                        
                </table>

            </div>
        );
    }
}


//reads data from state(component) and maps to this.props.shopping_list
function mapStateToProps(state) {
    return {}; 
}
//writes data to store
function mapDispatchToProps (dispatch) {
    return {}
}

var ConnectedGroupRunActive = connect(mapStateToProps, mapDispatchToProps)(GroupRunActive);

export default ConnectedGroupRunActive;