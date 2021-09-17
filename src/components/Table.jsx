import React from 'react';
import {Component} from 'react'


class Table extends Component {

    render() {
        return ( 
            <div>
                <table>
                    <tr>
                        <td>Runner ID</td>
                        <td>Time (min)</td>
                        <td>Distance (km)</td>
                        <td>Pace (km/min)</td>
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