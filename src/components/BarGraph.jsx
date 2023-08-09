import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import React from 'react';

const BarGraph = ({ data }) => {
    return (
        <div className="bargraph">
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
