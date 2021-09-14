import React from 'react';
import { connect } from 'react-redux';
import ConnectedGpsCoordinates from './Geolocation.jsx'
// import Table from './Table.jsx';

class GroupRunActive extends (React.Component) {

    render() {
        return ( 
            <div> 
                <ConnectedGpsCoordinates/>
            </div>
        );
    }
}


//reads data from state(component) and maps to this.props.shopping_list
function mapStateToProps(state) {
    return {
        runnersJoinedCount: state.runnersJoinedCount,
        runnersJoined: state.runnersJoined,
    }; 
}
//writes data to store
function mapDispatchToProps (dispatch) {
    return {}
}

var ConnectedGroupRunActive = connect(mapStateToProps, mapDispatchToProps)(GroupRunActive);

export default ConnectedGroupRunActive;