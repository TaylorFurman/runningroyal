import React from 'react';
import { connect } from 'react-redux';

class Dashboard extends (React.Component) {

    render() {
        return ( 
            <div >

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

var ConnectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default ConnectedDashboard;