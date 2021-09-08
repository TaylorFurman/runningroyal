import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom';
import { loadFromLocalStorage } from './util';

class GroupRunReadyUp extends (React.Component) {

    getRunnerCount(){
        var runnerCount = 0;
        if(loadFromLocalStorage()!== undefined){
            runnerCount = loadFromLocalStorage();
        } 
        return runnerCount;
    }

    componentDidMount(){
        let runnerCountForTable = this.getRunnerCount();
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

                    {/* <tr>
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
                    </tr> */}
                    
                    
                    </table>

                    <Button component={Link} to="/run-active" >Run Royal!</Button>
                    <Button component={Link} to="/" >Leave Lobby</Button>

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
