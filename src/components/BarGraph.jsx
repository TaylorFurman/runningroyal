import axios from 'axios';
import React from 'react';

var backEndUrl = 'https://run-royale.herokuapp.com';
if (process.env.NODE_ENV == 'development') {
    backEndUrl ='http://localhost:3700';
}

class BarGraph extends (React.Component) {
    constructor(props){
        super(props);
        this.state ={
            totalRuns: '',
            runDate: '',
            
        }
    }

    componentDidMount(){
        
        axios.get(`${backEndUrl}/run_data`)
        .then(res=>{
            
            //console.log(res.data);
             for(let i=0; i<res.data.length; i++){
                // console.log(res.data[i].run_date)
             }
           // console.log(res.data[0].run_date);
            this.setState({
                totalRuns: res.data.length,
                runDate: res.data.run_date
            })
        })
    }

    render() {
        return ( 
            <div>BarGraph
                <table>
                    <tr>
                        Total Number of Runs in Database = {this.state.totalRuns}
                        
                        <br/>
                        URL: {backEndUrl}
                    </tr>
                </table>



            </div>
            
        )
    }
}

export default BarGraph
