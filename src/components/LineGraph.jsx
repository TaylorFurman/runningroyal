import { WhereToVote } from '@material-ui/icons';
import axios from 'axios';
import React from 'react';

import {Line} from 'react-chartjs-2'

var backEndUrl = 'https://run-royale.herokuapp.com';
if (process.env.NODE_ENV === 'development') {
    backEndUrl ='http://localhost:3700';
}

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
                  label: '',
                  data: [], //Time (or Distance Later)
                  fill: false,
                  backgroundColor: '',
                  borderColor: '',
                },
              ],
            },
            
        }
    }

    componentDidMount=(event)=>{

        //console.log(this.state.chartData.labels);
        axios.get(`${backEndUrl}/run_data`)
        .then(res=>{
          let runDateArray = [];
          let runTimeArrayMinutes = [];
          let currentUserState = {};
            for(let i=0; i<res.data.length; i++){
                if(this.state.userId=res.data[i].run_date){
                  currentUserState = res.data[i];

                  let runDates = new Date(res.data[i].run_date).toDateString();
                  runDateArray.push(
                    runDates
                  )

                  let runTime = currentUserState.run_time_minutes;

                  runTimeArrayMinutes.push(
                    runTime
                  )

                  console.log(runTimeArrayMinutes)

                  this.setState(prevState =>({
                    chartData:{                // object that we want to update
                      ...prevState.chartData, // keep all other key-value pairs
                      labels: runDateArray, // update the value of specific key
                      datasets:[
                        {
                          label: 'Total run time',
                          data: runTimeArrayMinutes, //Time (or Distance Later)
                          fill: false,
                          backgroundColor: 'rgb(255, 99, 132)',
                          borderColor: 'rgba(255, 99, 132, 0.2)',
                        },
                      ],
                    }
                  }))
                  
                }else(
                    console.log("error")
              )
            }

            this.setState({
                totalRuns: res.data.length,
                //runDate: res.data.run_date,
                currentUserState: currentUserState
            })

        })
    }

    

    render() {
        return ( 
            <div>
                <table>
                    <tr>
                        <Line data={this.state.chartData} options={options}/>
                        <br/>
                        
                    </tr>
                </table>
            </div>     
        )
    }
}

export default LineGraph
