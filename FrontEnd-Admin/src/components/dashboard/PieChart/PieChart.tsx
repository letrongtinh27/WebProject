import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import './CustomPieChart.css';

type Props = {
    title: string,
    data: { name: string, value: number }[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DD0'];

const CustomPieChart = (props: Props) => {
    const { data } = props;
    return (
        <div>
            <h3>{props.title}</h3>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="value"
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default CustomPieChart;