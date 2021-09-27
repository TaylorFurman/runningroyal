import React from 'react';
import {Component} from 'react';
import runnerLogo from '../runner-girl.jpg';


class About extends Component {

    render() {
        return ( 
            <div>
                <img src={runnerLogo} height="200px" alt="pictureOfLadyRunning"/>
                <p>We're passionate about running and hope you'll find our service useful.</p> 
                <p>Join a run and meet other like minded folks. Compete for the fastest
                    5 miler and then part ways. Keep your running stats in one place. Enjoy your run!</p>
                <div>Take a look at our GitHub repos: 
                    <ul>
                        <li><a href="https://github.com/TaylorFurman/runningroyalbackend">Backend</a></li> 
                        <li><a href="https://github.com/TaylorFurman/runningroyal">Frontend</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default About;