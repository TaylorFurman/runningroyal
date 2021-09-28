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
            run_time_seconds: '',
            run_time_minutes: '',
            totalRuns: '',
            runDate: '',
            currentUserState: {},
            chartData: {
              labels: [], //Date of run
              datasets: [
                {
                  label: 'Total Time Ran',
                  data: [12, 19, 3, 5, 2, 3, 20], //Time (or Distance Later)
                  fill: false,
                  backgroundColor: 'rgb(255, 99, 132)',
                  borderColor: 'rgba(255, 99, 132, 0.2)',
                },
              ],
            },
            
        }
    }

    componentDidMount=(event)=>{

        //console.log(this.state.chartData.labels);
        axios.get(`${backEndUrl}/run_data`)
        .then(res=>{
            //console.log(res.data);
            let currentUserState = {};
             for(let i=0; i<res.data.length; i++){
                 if(this.state.userId==res.data[i].runner_id){
                    currentUserState = res.data[i]; 
                 }else(
                     console.log(" ")
                 )
             }
            this.setState({
                totalRuns: res.data.length,
                runDate: res.data.run_date,
                currentUserState: currentUserState
            })
            console.log(this.state.currentUserState.run_date + "Hello")

            let date = new Date(this.state.currentUserState.run_date).toDateString()

            this.setState(prevState => ({
              chartData: {                   // object that we want to update
                  ...prevState.chartData,    // keep all other key-value pairs
                  labels: [date]      // update the value of specific key
              }
          }))

              


            
        })
    }

    render() {
        return ( 
            <div>Line Graph
                <table>
                    <tr>
                        Total Number of Runs in Database = {this.state.totalRuns}
                        
                        <Line data={this.state.chartData} options={options}/>
                        <br/>
                        
                    </tr>
                </table>
            </div>     
        )
    }
}

export default LineGraph
