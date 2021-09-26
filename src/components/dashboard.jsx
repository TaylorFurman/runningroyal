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
        };
    }

    componentDidMount(){

        let currentUserVar = this.getUserIDAlert();
        this.setState({currentUser: currentUserVar});

        axios.get(`${backEndUrl}/run_data`, async(req,res)=>{

        }).then((res)=>{
            // res.data.
            console.log('logging res.data from run_data', res.data);

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
        document.getElementById("demo").innerHTML = text;
        return currentUser;
      }

    render() {
        return ( 
            <div >
                <img src={runnerLogo} height="300px" alt="graphicOfManRunning"/>
                <p id="demo"></p>

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