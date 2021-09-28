import React from 'react';
import { connect } from 'react-redux';
import ConnectedGpsCoordinates from './Geolocation.jsx'

class GroupRunActive extends (React.Component) {

    componentDidMount() {
        console.log('mounted');
        this.props.socket.emit('get_rooms');
    }

    render() {
        return ( 
            <div className="runActiveTables"> 
                <ConnectedGpsCoordinates/>
            </div>
        );
    }
}


//reads data from state(component) and maps to this.props.shopping_list
function mapStateToProps(state) {
    return {
        socket: state.socket,
        rooms: state.rooms
    }; 
}
//writes data to store
function mapDispatchToProps (dispatch) {
    return {}
}

var ConnectedGroupRunActive = connect(mapStateToProps, mapDispatchToProps)(GroupRunActive);

export default ConnectedGroupRunActive;