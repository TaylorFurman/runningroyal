import axios from 'axios';
import React from 'react';

class BarGraph extends (React.Component) {
    constructor(props){
        super(props);
        this.state ={
            totalRuns: '',
            
        }
    }

    componentDidMount(){
        axios.get("run_history.json")
        .then(res=>{
            console.log(res.data.length);
            this.setState({
                totalRuns: res.data.length
            })
        })
    }

    render() {
        return ( 
            <div>BarGraph
                <table>
                    <tr>
                        Total Number of Runs: {this.state.totalRuns} 
                    </tr>
                </table>



            </div>
            
        )
    }
}

export default BarGraph
