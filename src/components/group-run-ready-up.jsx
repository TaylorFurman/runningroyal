import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom';

import {io} from 'socket.io-client'


class GroupRunReadyUp extends (React.Component) {


     componentDidMount(){
        this.socket = io()
        
    }
    

    render() {
        {console.log(this.props.runnersJoined );}
        return ( 
            <div >
                <table className="runReadyTable">
                    {this.props.runnersJoined.map(runner => {
                        return(
                            <tr>
                                <td>Runner ID:</td>
                                <td>{runner.ID}</td>
                                <td>
                                    <form>
                                        <input type="checkbox"></input>
                                        <label for="Ready Up" style={{marginLeft: "10px"}}>Ready Up</label>
                                    </form>
                                </td>
                            </tr>
                        );
                    })}
                </table>

                <Button variant="contained" color="primary" component={Link} to="/run-active" >Run Royale!</Button>
                <Button variant="contained" component={Link} to="/" >Leave Lobby</Button>

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

var ConnectedGroupRunReadyUp = connect(mapStateToProps, mapDispatchToProps)(GroupRunReadyUp);

export default ConnectedGroupRunReadyUp;
