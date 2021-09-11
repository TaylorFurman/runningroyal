import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom';

class GroupRunReadyUp extends (React.Component) {


    componentDidMount(){
        let runnerCountForTable = this.props.runnersJoinedCount;
        for (let i = 0; i < runnerCountForTable; i++) {
            document.querySelector(".runReadyTable").insertAdjacentHTML(
                "beforeend",
                `<tr> 
                    <td>ID</td>
                    <td>
                        <form>
                            <input type="checkbox"></input>
                            <label for="Ready Up">Ready Up</label>
                        </form>
                    </td>
                </tr>`
            );
        }
    }
    

    render() {
        return ( 
            <div >
                <table className="runReadyTable">
                    <tr>
                        <th>Runner ID:</th>
                        <th></th>
                    </tr>
                  
                </table>

                <Button component={Link} to="/run-active" >Run Royal!</Button>
                <Button component={Link} to="/" >Leave Lobby</Button>

            </div>
        );
    }
}


//reads data from state(component) and maps to this.props.shopping_list
function mapStateToProps(state) {
    return {
        runnersJoinedCount: state.runnersJoinedCount,
    }; 
}
//writes data to store
function mapDispatchToProps (dispatch) {
    return {}
}

var ConnectedGroupRunReadyUp = connect(mapStateToProps, mapDispatchToProps)(GroupRunReadyUp);

export default ConnectedGroupRunReadyUp;
