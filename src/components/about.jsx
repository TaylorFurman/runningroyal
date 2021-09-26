import React from 'react';
import {Component} from 'react'


class About extends Component {

    render() {
        return ( 
            <div>
                <img src="./runner.jpg"/>
                <p>Hey! We're passionate about running and hope you'll find our service useful. Join a run and meet other like minded folks. Compete for the fastest
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