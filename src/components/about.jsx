import React from 'react';
import {Component} from 'react';
import runnerLogo from '../runner-girl.jpg';


class About extends Component {

    render() {
        return ( 
            <div>
                <img src={runnerLogo} height="200px" alt="pictureOfLadyRunning" className="pictureOfLadyRunning"/>
                <h3>We're passionate about running and hope you'll find our service useful.</h3> 
                <p>Join a run and meet other like minded folks.</p>
                <p> Compete for the fastest 5 miler and then part ways.</p>
                <p>Keep your running stats in one place. Enjoy your run!</p>
                <hr className="aboutHR"/>
                <br/>
                <br/>
                <div>
                    <p>Navigate to the home page to join a run or head to the dashboard to see your run stats</p> 
                    <hr className="aboutHR"/>
                    <br/>
                    <br/>
                    <p>Take a look at our GitHub repos: 
                        <ul className="aboutGithubLinks">
                            <li><a href="https://github.com/TaylorFurman/runningroyalbackend">Backend</a></li> 
                            <li><a href="https://github.com/TaylorFurman/runningroyal">Frontend</a></li>
                        </ul>
                    </p>
                </div>
            </div>
        );
    }
}

export default About;