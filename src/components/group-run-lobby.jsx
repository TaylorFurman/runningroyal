import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Button } from '@material-ui/core';
import { saveToLocalStorage } from './util';
import { loadFromLocalStorage } from './util';



class GroupRunActive extends (React.Component) {

    countRunners(event){
        let count;
        if(loadFromLocalStorage()!== undefined){
            count = loadFromLocalStorage();
        } else{
            count = 0;
        }
        
        count++;
        saveToLocalStorage(count);
    }    

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
                        <td>0/10</td>
                        <td><Button 
                                component={Link} 
                                to="/run-ready" 
                                onClick={(e) => this.countRunners(e)}>
                            Join</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>0/10</td>
                        <td><Button 
                                component={Link} 
                                to="/run-ready" 
                                onClick={(e) => this.countRunners(e)}>
                            Join</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>0/10</td>
                        <td><Button 
                                component={Link} 
                                to="/run-ready" 
                                onClick={(e) => this.countRunners(e)}>
                            Join</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>0/10</td>
                        <td><Button 
                                component={Link} 
                                to="/run-ready" 
                                onClick={(e) => this.countRunners(e)}>
                            Join</Button>
                        </td>
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