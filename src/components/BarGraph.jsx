import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import React from 'react';

const BarGraph = ({ data }) => {
    console.log(data, 'bar');
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ResponsiveContainer width="30%" aspect={2}>
                <BarChart data={data}>
                    <XAxis dataKey='code' />
                    <YAxis />
                    <Bar dataKey='rate_float' fill="#417bcc" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarGraph;
