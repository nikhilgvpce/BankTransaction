import React, { Component } from "react";
import DataGrid, { Paging, Pager } from 'devextreme-react/data-grid';
import Analytics from "../Analytics/Analytics";

export default class TableData extends Component {

     state = {
        showAnalytics: false
     };

    handleAnalytics = () => {
        this.setState({showAnalytics: !this.state.showAnalytics});
    }

    render() {
        return (
            <div>
                <h3>Your Account Transactions</h3>
                <DataGrid
                    dataSource={this.props.data}
                    defaultColumns={this.props.columns}
                    showBorders={true}>
                    <Paging defaultPageSize={10} />
                    <Pager
                        showPageSizeSelector={true}
                        allowedPageSizes={[5, 10, 20]}
                        showInfo={true} />
                </DataGrid>
                {this.state.showAnalytics ? <Analytics data={this.props.data}/> : null}
            </div>
        )
    }
}