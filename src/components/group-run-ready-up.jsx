import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom';

class GroupRunReadyUp extends (React.Component) {

    render() {
        return ( 
            <div >
                <table className="runReadyTable">
                    <tr>
                        <th>Runner ID:</th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>
                            <form>
                                <input type="checkbox"></input>
                                <label for="Ready Up">Ready Up</label>
                            </form>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>                            
                            <form>
                                <input type="checkbox"></input>
                                <label for="Ready Up">Ready Up</label>
                            </form>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>                            
                            <form>
                                <input type="checkbox"></input>
                                <label for="Ready Up">Ready Up</label>
                            </form>
                        </td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>                            
                            <form>
                                <input type="checkbox"></input>
                                <label for="Ready Up">Ready Up</label>
                            </form>
                        </td>
                    </tr>
                    
                    </table>
                    <Button variant="contained" color="primary" component={Link} to="/run-active" >Run Royal!</Button>
                    &nbsp; &nbsp; &nbsp;
                    <Button variant="contained" component={Link} to="/" >Leave Lobby</Button>
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

var ConnectedGroupRunReadyUp = connect(mapStateToProps, mapDispatchToProps)(GroupRunReadyUp);

export default ConnectedGroupRunReadyUp;
