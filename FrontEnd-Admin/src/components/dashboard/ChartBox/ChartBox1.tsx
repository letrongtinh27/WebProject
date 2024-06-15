import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import React from "react";
import './chartbox.css'
import {type} from "os";

type Props = {
    icon: any,
    title: string,
    total: any,
    unit: string,
}

const ChartBox1 = (props: Props) => {
    return (
        <div className="chartBox">
            <div className="boxInfo">
                <div className="title">
                    {props.icon}
                    <span>{props.title} </span>
                </div>
                <h1>{props.total}</h1>  <span>{props.unit} </span>
            </div>
        </div>
    )
}

export default ChartBox1;