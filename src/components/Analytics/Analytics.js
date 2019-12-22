import React, { Component } from "react";
import { DateBox } from "devextreme-react";
import "./Analytics.css"

export default class Analytics extends Component {

    state = {
        startDate: null,
        endDate: null,
        pieChartData: null,
        showPieChart: false
    }

    gwtDate = (date) => {
        const day = date[8] + date[9];
        const month = date[4] + date[5] + date[6];
        const year = date[11] + date[12] + date[13] + date[14];
        return day + month + year;
    }

    setStartDate = (e) => {
        this.setState(function (prevState, props) {
            return { startDate: this.getDate(e.value) }
        });
    }

    setEndDate = (e) => {
        this.setState(function (prevState, props) {
            return { endDate: this.getDate(e.value) }
        });

        if (this.state.startDate) {
            this.getChartData();
        }
    }

    getWithDrawCount = () => {
        let count = 0;
        this.props.data.forEach(transaction => {
            if(transaction['Withdrawal AMT'] != null) {
                count++;
            }
        });
        return count;
    }

    getDepositCount = () => {
        let count = 0;
        this.props.data.forEach(transaction => {
            if(transaction['Deposit AMT'] != null) {
                count++;
            }
        });
        return count;
    }

    getChartData = () => {
        const withDrawCount = this.getWithDrawCount();
        const depositCount = this.getDepositCount();
        const pieChartData = [
            {
            'property' : 'With Drawls',
            'value' : withDrawCount
            },
            {
                'property' : 'deposit count',
                'value' : depositCount
            }
        ]
        this.setState({pieChartData, showPieChart: true});
    }

    render() {
        return (
            <div>
                <p>Welcome to Analytics</p>
                <div>
                    <DateBox className="dateBox" placeholder="start date" onValueChanged={this.setStartDate} />
                    <DateBox className="dateBox" placeholder="end date" onValueChanged={this.setEndDate} />
                    {this.state.showPieChart ? { <PieChart dataSoruce={this.state.pieChartData}/> } : null }
                </div>
            </div>
        )
    }
}