import React from 'react';
import { connect } from 'react-redux';

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

                    <button className="runRoyalButton">Run Royal!!</button>
                    <button className="leaveLobbyButton">Leave Lobby</button>

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
