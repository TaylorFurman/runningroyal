import React from 'react';
import { connect } from 'react-redux';

class GroupRunActive extends (React.Component) {

    render() {
        return ( 
            <div >
                <table className="runLobbyTable">
                    <tr>
                        <th>Group ID:</th>
                        <th>Total Runners:</th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td></td>
                        <td><a href="http://www.google.com">Join</a></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td></td>
                        <td><a href="http://www.google.com">Join</a></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td></td>
                        <td><a href="http://www.google.com">Join</a></td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td></td>
                        <td><a href="http://www.google.com">Join</a></td>
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