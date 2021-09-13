import React from 'react';
import { connect } from 'react-redux';
import ConnectedGpsCoordinates from './Geolocation.jsx'
// import Table from './Table.jsx';

class GroupRunActive extends (React.Component) {
    constructor(props){
        super (props);
        this.state = {bottomTableClassName:'',}
    }

    render() {
        return ( 
            <div >
               
                <ConnectedGpsCoordinates/>
            {/* For every user in the group, create table */}
            {/* {
                 this.props.runnersJoined.map(runner => {
                    return(
                //     <table className="runActiveTable0">
                //         <tr>
                //             <td>{runner.ID}</td>
                //             <td>Distance</td>
                //             <td>{runner.distance}</td>
                //         </tr>
                //         <tr>
                //             <td>Player ID</td>
                //             <td>Average Pace</td>
                //             <td>{runner.averagePace}</td>
                //         </tr>
                //         <tr>
                //             <td>(Rank)</td>
                //             <td>Time</td>
                //             <td>{runner.time}</td>
                //         </tr>                 
                //     </table>

                    <Table 
                        runnerID={runner.ID} 
                        runTime={runner.time} 
                        runDistance={runner.distance}
                        runPace={runner.pace}/>
                    );
                })            

            } */}
                
            </div>
        );
    }
}


//reads data from state(component) and maps to this.props.shopping_list
function mapStateToProps(state) {
    return {
        runnersJoinedCount: state.runnersJoinedCount,
        runnersJoined: state.runnersJoined,
    }; 
}
//writes data to store
function mapDispatchToProps (dispatch) {
    return {}
}

var ConnectedGroupRunActive = connect(mapStateToProps, mapDispatchToProps)(GroupRunActive);

export default ConnectedGroupRunActive;