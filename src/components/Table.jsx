import React from 'react';
import {Component} from 'react'

import {io} from 'socket.io-client'


class Table extends Component {

    componentDidMount(){
        this.socket = io()
        
        
    }

    render() {
        return ( 
            <div>
                <table>
                    <tr>
                        <td>Runner ID</td>
                        <td>Time (sec)</td>
                        <td>Distance (m)</td>
                        <td>Pace (m/min)</td>
                        {/* <td>
                            <form>
                                <input type="checkbox"></input>
                                <label for="Ready Up">Ready Up</label>
                            </form>
                        </td> */}
                    </tr>
                    <tr>
                        <td>{this.props.runnerID}</td>
                        <td>{this.props.runTime}</td>
                        <td>{this.props.runDistance}</td>
                        <td>{this.props.runPace}</td>
                    </tr>

                </table>
            </div>
        );
    }
}

export default Table;