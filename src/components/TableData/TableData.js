import React, { Component } from "react";
import DataGrid, { Paging, Pager } from 'devextreme-react/data-grid';
import { Button, ButtonToolbar } from "react-bootstrap";


export default class TableData extends Component {
    render() {
        return (
            <div>
                <ButtonToolbar>
                    <Button variant="primary">View Transaction Analytics</Button>
                </ButtonToolbar>
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
            </div>
        )
    }
}