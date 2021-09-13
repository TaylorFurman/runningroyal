import React from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD
// import {Link} from 'react-router-dom';
// import { Button } from '@material-ui/core';
=======

>>>>>>> master
// import { loadFromLocalStorage } from './util';

import ConnectedGpsCoordinates from './Geolocation.jsx'

class GroupRunActive extends (React.Component) {
    constructor(props){
        super (props);
        this.state = {bottomTableClassName:'',}
    }

    componentDidMount(){
        let runnerCountForTable = this.props.runnersJoinedCount;
        let classNameCount;
        let previousClassNameCount;

        if(this.state.bottomTableClassName===''){
            previousClassNameCount = 0;
        }
        else{
            previousClassNameCount = this.state.bottomTableClassName;
        }

        // for (let i = 0; i < runnerCountForTable; i++) {
        //     classNameCount = previousClassNameCount+1;
        //     document.querySelector(".runActiveTable"+previousClassNameCount).insertAdjacentHTML(
        //         "beforeend",
        //         `<table className="runActiveTable"+classNameCount>
        //             <tr>
        //                 <td>dynamic${classNameCount}</td>
        //                 <td>Distance</td>
        //                 <td>2.3 miles</td>
        //             </tr>
        //             <tr>
        //                 <td>Player ID</td>
        //                 <td>Average Pace</td>
        //                 <td>7:30</td>
        //             </tr>
        //             <tr>
        //                 <td>(Rank)</td>
        //                 <td>Time</td>
        //                 <td>8:55</td>
        //             </tr>
        //         </table>`
        //     );
        //     previousClassNameCount = classNameCount;
        // }
        // this.state.bottomTableClassName = classNameCount;
    }

    render() {
        return ( 
            <div >
               
                {/* <ConnectedGpsCoordinates/> */}
            {/* For every user in the group, create table */}
            {
                this.props.runnersJoined.map(runner => {
                    return(
                    <table className="runActiveTable0">
                        <tr>
                            <td>{runner.ID}</td>
                            <td>Distance</td>
                            <td>{runner.distance}</td>
                        </tr>
                        <tr>
                            <td>Player ID</td>
                            <td>Average Pace</td>
                            <td>{runner.averagePace}</td>
                        </tr>
                        <tr>
                            <td>(Rank)</td>
                            <td>Time</td>
                            <td>{runner.time}</td>
                        </tr>                 
                    </table>
                    );
                })
            }
                
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