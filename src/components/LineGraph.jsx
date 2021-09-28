import { WhereToVote } from '@material-ui/icons';
import axios from 'axios';
import React from 'react';

import {Line} from 'react-chartjs-2'

var backEndUrl = 'https://run-royale.herokuapp.com';
if (process.env.NODE_ENV === 'development') {
    backEndUrl ='http://localhost:3700';
}

const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

class LineGraph extends (React.Component) {
    constructor(props){
        super(props);
        
        this.state ={
            userId: this.props.userId,
            runner_id: '',
            run_date: '',
            run_distance: '',
            run_ranking: '',
            run_time_seconds: '',
            run_time_minutes: '',
            average_running_Pace: '',
            latitude: '',
            longitude: '',
            totalRuns: '',
            runDate: '',
            chartData: '',
        }
    }

    componentDidMount=(event)=>{

        console.log(data.labels);


        axios.get(`${backEndUrl}/run_data`)
        .then(res=>{
            //console.log(res.data);
             for(let i=0; i<res.data.length; i++){
                 if(this.props.userId==res.data[i].runner_id){
                    this.setState({
                        runner_id: res.data[i].runner_id,
                        runDate: res.data[i].run_date 
                    })
                 }else(
                     console.log(" ")
                 )
                 
                //console.log(this.state.runDate);
                 
             //console.log(res.data)
             }
            this.setState({
                totalRuns: res.data.length,
                runDate: res.data.run_date
            })

            
        })
    }

    render() {
        return ( 
            <div>Line Graph
                <table>
                    <tr>
                        Total Number of Runs in Database = {this.state.totalRuns}
                        
                        <Line data={data} options={options}/>
                        <br/>
                        
                    </tr>
                </table>
            </div>     
        )
    }
}

export default LineGraph
