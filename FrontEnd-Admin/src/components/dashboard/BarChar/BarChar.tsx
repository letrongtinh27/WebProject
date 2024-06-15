import {BarChart} from "@mui/x-charts/BarChart";
import React from "react";
import "../db.css"
type Props = {
        theatreName: any,
        totalPrice: any
}
const BarChar = (props: Props) => {
        return (
               <BarChart
                   height={650}
                   series={[
                       { data: props.totalPrice, label: 'VND', id: 'Id' },
                   ]}
                   xAxis={[{ data: props.theatreName, scaleType: 'band' }]}/>
        )
    }
    export default BarChar;