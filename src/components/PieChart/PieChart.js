
import PieChart, {
    Legend,
    Series,
    Tooltip,
    Format,
    Label,
    Connector,
    Export
} from 'devextreme-react/pie-chart';

import React, { Component } from "react";

export default class PieChart extends Component {
    render() {
        return (
            <div>
                <PieChart
                    id="pie"
                    dataSource={areas}
                    palette="Bright"
                    title="Area of Countries"
                    onPointClick={this.pointClickHandler}
                    onLegendClick={this.legendClickHandler}
                >
                    <Series
                        argumentField="country"
                        valueField="area"
                    >
                        <Label visible={true}>
                            <Connector visible={true} width={1} />
                        </Label>
                    </Series>

                    <Size width={500} />
                    <Export enabled={true} />
                </PieChart>
            </div>
        )
    }
}