import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import runnerLogo from '../runner.jpg';

import LineGraph from './LineGraph'
import { FormatIndentDecreaseTwoTone } from '@material-ui/icons';

var backEndUrl = [(process.env.API_URL || 'http://localhost:3700')];

class Dashboard extends (React.Component) {
    constructor(props){
        super (props);
       
        this.state = {
            currentUser: 0,
            totalRuns: '',
            runDate: '',
            currentUserState: {},
            userId: null,
        };
        
    }

    componentDidMount(){

        let currentUserVar = this.getUserIDAlert();
        let userId = parseInt(currentUserVar)

        
        this.setState({
            currentUser: currentUserVar, 
            userId: userId
        }, ()=>{});

        axios.get(`${backEndUrl}/run_data`)
        .then(res=>{
            

            let currentUserState = {};
             for(let i=0; i<res.data.length; i++){
                if(res.data[i].runner_id == this.state.currentUser){
                    currentUserState = res.data[i];
                }
             }
             this.setState({
                 currentUserState: currentUserState,
             });

        }).catch((error)=>{
            console.log('Issue in componentDidMount, pulling run_data', error);
        }) 
        
    }

    getUserIDAlert() {
        let currentUser = prompt("Please enter your user ID:");
        
        let text = "";
        if (currentUser === null || currentUser === "") {
            text = "User cancelled the prompt.";
        } else {
            text = "Hello, User ID " + currentUser + "!"; 
        }
        document.getElementById("userIDAlert").innerHTML = text;
        return currentUser
      }
      

    run_state() {
        
    }

    render() {
        
        return ( 
            <div >
                <img src={runnerLogo} height="300px" alt="graphicOfManRunning"/>
                <p id="userIDAlert"></p>
                <table>
                    <tr>
                        <td>Date:</td>
                        <td>Time (min):</td>
                        <td>Distance (m):</td>
                        <td>Ranking:</td>
                    </tr>
                    <tr>
        
                        <td>{new Date(this.state.currentUserState.run_date).toDateString()}</td>
                        <td>{this.state.currentUserState.run_time_minutes}</td>
                        <td>{this.state.currentUserState.run_distance}</td>
                        <td>{this.state.currentUserState.run_ranking}</td>
                    </tr>
                </table>
         
                
                {this.state.userId !==null ? <LineGraph userId= {this.state.userId}/> : null}
    

            </div>
        );
    }
}


//reads data from state(component) and maps to this.props.
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

var ConnectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default ConnectedDashboard;