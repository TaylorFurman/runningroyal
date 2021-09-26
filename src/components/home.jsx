import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import BarGraph from './BarGraph'
import { Button } from '@material-ui/core';
import axios from 'axios';

var backEndUrl = 'https://run-royale.herokuapp.com';
if (process.env.NODE_ENV === 'development') {
    backEndUrl ='http://localhost:3700';
}


class Home extends (React.Component) {

    componentDidMount(){
        axios.get(`${backEndUrl}/run_data`, async(req,res)=>{

        }).then((res)=>{
            console.log('logging res from run_data', res);

        }).catch((error)=>{
            console.log('Issue in componentDidMount, pulling run_data', error);
        }) 
        
    }
    
    render() {
        return ( 
            <div>
                <h1>Welcome Back!</h1>

                <BarGraph/>
                
                {/* <h3 style={{color:"red"}}>Click below to find a lobby</h3> */}
                <Button variant="contained" color="primary" component={Link} to="/run-lobby" >Join A Run</Button>
            </div>
        );
    }
}


//reads data from state(component) and maps to this.props.shopping_list
function mapStateToProps(state) {
    return {

    }; 
}
//writes data to store
function mapDispatchToProps (dispatch) {
    return {}
}

var ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);

export default ConnectedHome;