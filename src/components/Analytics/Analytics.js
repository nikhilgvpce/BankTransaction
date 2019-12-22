import React, { Component } from "react";
import { DateBox } from "devextreme-react";
import "./Analytics.css"
import Pie from "../PieChart/PieChart";

export default class Analytics extends Component {

    state = {
        startDate: null,
        endDate: null,
        pieChartData: null,
        showPieChart: false
    }

    getDate(date) {
        const day = date[8] + date[9];
        const month = date[4] + date[5] + date[6];
        const year = date[11] + date[12] + date[13] + date[14];
        return day + " " + month + " " + year;
    }

    setStartDate = (e) => {
        const date = this.getDate(e.value.toString());
        this.setState(function (prevState, props) {
            return { startDate: date }
        });

        if (this.state.endDate) {
            this.getChartData();
        }
    }

    setEndDate = (e) => {
        const date = this.getDate(e.value.toString());
        this.setState(function (prevState, props) {
            return { endDate: date }
        });

        if (this.state.startDate) {
            this.getChartData();
        }
    }

    parseDate = (date) => Date.parse(date);

    getWithDrawCount = () => {
        let count = 0;
        this.props.data.forEach(transaction => {
            if (
                ((this.parseDate(transaction['Value Date']) >= this.parseDate(this.state.startDate))
                    ||
                    (this.parseDate(transaction['Value Date'] <= this.parseDate(this.state.endDate))
                    ))
                && transaction['Withdrawal AMT'] !== "") {
                count++;
            }
        });
        return count;
    }

    getDepositCount = () => {
        let count = 0;
        this.props.data.forEach(transaction => {
            if (
                (
                    ((this.parseDate(transaction['Value Date']) >= this.parseDate(this.state.startDate))
                        ||
                        (this.parseDate(transaction['Value Date'] <= this.parseDate(this.state.endDate))))
                    && transaction['Deposit AMT'] !== ""
                )
            ) {
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
                'property': 'With Drawals',
                'value': withDrawCount
            },
            {
                'property': 'Deposits',
                'value': depositCount
            }
        ]
        this.setState({ pieChartData, showPieChart: true });
    }

    render() {
        const pieChart = (
            <Pie dataSource={this.state.pieChartData} />
        )
        return (
            <div className="analyticsStyling">
                <p className="p">Choose start date and end date </p>
                <div>
                    <DateBox className="dateBox" placeholder="start date" onValueChanged={this.setStartDate} />
                    <DateBox className="dateBox" placeholder="end date" onValueChanged={this.setEndDate} />
                    {this.state.showPieChart ? pieChart : null}
                </div>
            </div>
        )
    }
}