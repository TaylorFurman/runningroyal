import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import runnerLogo from '../runner.jpg';

var backEndUrl = [(process.env.API_URL || 'http://localhost:3700')];

class Dashboard extends (React.Component) {
    constructor(props){
        super (props);
       
        this.state = {
            currentUser: 0,
            totalRuns: '',
            runDate: '',
            currentUserState: [],
            
        };
    }

    componentDidMount(){

        let currentUserVar = this.getUserIDAlert();
        this.setState({currentUser: currentUserVar});

        axios.get(`${backEndUrl}/run_data`)
        .then(res=>{
            
            console.log(res.data);
            let currentUserState = {};
             for(let i=0; i<res.data.length; i++){
                if(res.data[i].runner_id == this.state.currentUser){
                    currentUserState = res.data[i];
                }
             }
             this.setState({
                 currentUserState: currentUserState,
             });
        //    console.log(res.data[0].run_date);
        //     this.setState({
        //         totalRuns: res.data.length,
        //         runDate: res.data.run_date
        //     })
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
        return currentUser;
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
                        <td>Run Date:</td>
                        <td>Run Time (Minutes):</td>
                        <td>Run Distance:</td>
                        <td>Run Ranking:</td>
                    </tr>
                    <tr>
                        <td>{this.state.currentUserState.run_date}</td>
                        <td>{this.state.currentUserState.run_time_minutes}</td>
                        <td>{this.state.currentUserState.run_distance}</td>
                        <td>{this.state.currentUserState.run_ranking}</td>
                    </tr>
                </table>
                {/* {Object.keys(this.state.currentUserState).map((key, i) => {    
                    return(
                        <table>
                            <tr><td>{this.state.currentUserState[key]}</td></tr>
                            <tr><td>hey</td></tr>
                        </table>
                    );
                })} */}
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