import React, { Component } from "react";
import { Spinner } from "react-bootstrap";
import TableData from "../TableData/TableData";
import "./Home.css";

export default class Home extends Component {

    state = {
        data: null,
        columns: ["Account No", "Date", "Transaction Details",
            "Value Date", "Withdrawal AMT", "Deposit AMT", "Balance AMT"]
    }

    componentDidMount() {
        // inorder to solve the CORS issue temporarily..I used this URL: https://cors-anywhere.herokuapp.com 
        fetch('https://cors-anywhere.herokuapp.com/http://starlord.hackerearth.com/bankAccount').then(response => {
            return response.json();
        }).then(data => {
            this.setState({ data: data });
        });
        // axios.get('https://cors-anywhere.herokuapp.com/http://starlord.hackerearth.com/bankAccount').then(response => {
        //     this.setState({ data: response.data });
        // });
    }

    render() {
        const showSpinner = (
            <div className="spinner">
                <p>Getting Transcation Details...</p>
                <Spinner animation="border" role="status"/>
            </div>

        );

        const tableData = (
            <TableData data={this.state.data} columns={this.state.columns} />
        )
        return (
            this.state.data ? tableData : showSpinner
        )
    }
}