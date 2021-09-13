import React from 'react';
import {Component} from 'react'


class Table extends Component {

    render() {
        return ( 
            <div>
                <table>
                    <tr>
                        <td>Runner ID</td>
                        <td>{this.props.runnerID}</td>
                    </tr>
                    <tr>
                        <td>Time</td>
                        <td>{this.props.runTime}</td>
                    </tr>
                    <tr>
                        <td>Distance</td>
                        <td>{this.props.runDistance}</td>
                    </tr>
                    <tr>
                        <td>Pace</td>
                        <td>{this.props.runPace}</td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default Table;