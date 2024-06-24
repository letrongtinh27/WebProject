import * as React from 'react';
import { BarChart, barElementClasses } from '@mui/x-charts/BarChart';
import '../db.css';

type Props = {
    title: string,
    name: any,
    totalPrice: any,
    height: any
}

const colors: string[] = ['#A172F7'];

const BarChar = (props: Props) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <BarChart
                sx={(theme) => ({

                    [`.${barElementClasses.root}`]: {
                        fill: theme.palette.background.paper,
                        strokeWidth: 3,
                    },
                    [`.MuiBarElement-series-Id`]: {
                        stroke: colors[0],
                    },
                    backgroundImage: `linear-gradient(rgba(${theme.palette.mode === 'dark' ? '255,255,255' : '0, 0, 0'}, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(${theme.palette.mode === 'dark' ? '255,255,255' : '0, 0, 0'}, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '35px 35px',
                })}
                height={props.height}
                series={[
                    { data: props.totalPrice, label: 'VND', id: 'Id' },
                ]}
                xAxis={[{ data: props.name, scaleType: 'band' }]}
                colors={colors}
            />
        </div>
    );
}

export default BarChar;