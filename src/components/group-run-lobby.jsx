import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import beachRunImage from '../beach_jog.jpg';

class GroupRunActive extends (React.Component) {

    addUserID(roomID, runnerID){
        console.log('socket.emit', this.props.socket.emit);
        this.props.socket.emit('addUserID', {roomID, runnerID});
        this.props.socket.emit('addRunnerID', {roomID, runnerID});
        this.props.history.push(`/run-ready/${roomID}`);
    }

    componentDidMount() {
        console.log('mounted');
        this.props.socket.emit('get_rooms');
    }    

    render() {
        return ( 
            <div>
                <table className="runLobbyTable">
                    <tr>
                        <th>Group ID:</th>
                        <th>Total Runners:</th>
                        <th></th>
                    </tr>
                    {this.props.rooms.map((room, i) =>
                        <tr>
                            <td>{room.name}</td>
                            <td>{room.runnersJoined.length}/10</td>
                            <td><Button
                                    variant="contained"
                                    onClick={(e) => this.addUserID(i, room.allRunners.length+1)}
                                >Join</Button>
                            </td>
                        </tr>
                    )}
                </table>
                    {/* <Button variant="contained" color="primary" component={Link} to="/" >Return Home</Button> */}
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