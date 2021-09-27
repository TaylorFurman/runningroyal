import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom';


class GroupRunReadyUp extends (React.Component) {

    constructor(props){
        super (props);
        this.state = {
            checkCount: 0
        };
    }

    componentDidMount() {
        console.log('mounted');
        this.props.socket.emit('get_rooms');
    }

    handleCheck(event){
        // console.log('handleCheckstate', this.state);
        this.setState({checkCount: this.state.checkCount+1});
        // console.log('checkout at the end of the handleCheck method', this.state.checkCount);
    }

    render() {
        // var myroom = parseInt(this.props.match.params.room);
        // console.log('props', this.props, this.props.rooms[myroom]);
        // console.log('runnersJoined',this.props.rooms.runnersJoined);
        return ( 
            <div >
                <p>Check the box next to your Runner ID when you are ready to run.</p>
                <p>Once all runners have checked Ready Up, the button will be available to begin the run.</p>
                <table className="runReadyTable">
                    {this.props.rooms[0].runnersJoined.map((runner) => {
                        return(
                            <tr>
                                <td>Runner ID:</td>
                                <td>{runner}</td>
                                <td>
                                    <form>
                                        <input type="checkbox" onChange={(e)=> this.handleCheck(e)}></input>
                                        <label for="Ready Up" style={{marginLeft: "10px"}}>Ready Up</label>
                                    </form>
                                </td>
                            </tr>
                        );
                    })}
                </table>

                <Button 
                    disabled={this.state.checkCount<this.props.rooms[0].runnersJoined.length} 
                    variant="contained" 
                    color="primary" 
                    component={Link} 
                    to="/run-active">Run Royale!
                </Button>
                <Button 
                    variant="contained" 
                    component={Link} 
                    to="/" >Leave Lobby
                </Button>

            </div>
        );
    }
}


//reads data from state(component) and maps to this.props.shopping_list
function mapStateToProps(state) {
    return {
        rooms: state.rooms,
        socket: state.socket
    }; 
}
//writes data to store
function mapDispatchToProps (dispatch) {
    return {}
}

var ConnectedGroupRunReadyUp = connect(mapStateToProps, mapDispatchToProps)(GroupRunReadyUp);

export default ConnectedGroupRunReadyUp;
