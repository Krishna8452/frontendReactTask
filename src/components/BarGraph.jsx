import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis} from "recharts"
import React from 'react'

const BarGraph = ({data}) => {
   console.log(data,'bar')
  return (
    <div style={{display:'flex', justifyContent:'center'}}>
    <ResponsiveContainer width="40%" aspect={3}>
        <BarChart data ={data} width={100} height={100}>
            <XAxis dataKey='code'/>
            <YAxis/>
            <Bar dataKey='rate_float' fill="#417bcc" />
        </BarChart>
    </ResponsiveContainer>
    </div>
  )
}
export default BarGraph