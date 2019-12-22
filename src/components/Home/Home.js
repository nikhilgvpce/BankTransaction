import React, { Component } from "react";
import { Spinner } from "react-bootstrap";
import TableData from "../TableData/TableData";
import { Route, Switch, NavLink } from "react-router-dom";
import "./Home.css";
import Analytics from "../Analytics/Analytics";

export default class Home extends Component {

    state = {
        data: null,
        columns: ["Account No", "Date", "Transaction Details",
            "Value Date", "Withdrawal AMT", "Deposit AMT", "Balance AMT"]
    }

    componentDidMount() {
        // Inorder to solve the CORS issue temporarily..I used this URL: https://cors-anywhere.herokuapp.com 
        fetch('https://cors-anywhere.herokuapp.com/http://starlord.hackerearth.com/bankAccount').then(response => {
            return response.json();
        }).then(data => {
            this.setState({ data: data });
        });
    }

    render() {
        const showSpinner = (
            <div className="spinner">
                <p>Getting Transcation Details...</p>
                <Spinner animation="border" role="status" />
            </div>

        );

        const tableData = (
            <TableData data={this.state.data} columns={this.state.columns} />
        )

        const analytics = (
            <Analytics data={this.state.data} />
        )
        return (
            <div>
                {this.state.data ?
                    <div>
                        <nav className="nav">
                            <ul>
                                <li><NavLink to="/" exact>TableData</NavLink></li>
                                <li>
                                    <NavLink to="/Analytics" >
                                        Analytics
                            </NavLink>
                                </li>
                            </ul>
                        </nav>
                        <Switch>
                            <Route path="/Analytics" exact component={() => analytics} />
                            <Route path="/" exact component={() => tableData} />
                        </Switch>
                    </div>
                    : showSpinner
                }
            </div>
        )
    }
}