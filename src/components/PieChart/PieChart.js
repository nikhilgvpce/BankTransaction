import PieChart, {
    Series,
    Label,
    Connector,
    Export
} from 'devextreme-react/pie-chart';

import React, { Component } from "react";

export default class Pie extends Component {
    render() {
        return (
            <div>
                <PieChart
                    id="pie"
                    dataSource={this.props.dataSource}
                    palette="Bright"
                    title="Transaction Behaviour"
                >
                    <Series
                        argumentField="property"
                        valueField="value"
                    >
                        <Label visible={true}>
                            <Connector visible={true} width={1} />
                        </Label>
                    </Series>
                    <Export enabled={true} />
                </PieChart>
            </div>
        )
    }
}