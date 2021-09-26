import react from 'react';
import {Component} from 'react'
import { connect } from 'react-redux';

class Login extends Component {

    render() {
        return ( 
            <div>
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {}; 
}
//writes data to store
function mapDispatchToProps (dispatch) { 
    return {}
}

var ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

export default ConnectedLogin;