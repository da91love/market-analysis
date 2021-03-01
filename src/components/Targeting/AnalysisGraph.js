import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';


const AnalysisGraph = (props) => {
    const {graphData, id} = props;
    const {name, xAxisKeyName, dataKey, data} = graphData;
      
   return (
    <ResponsiveContainer className="p-3" width="100%" height={300}>
        <LineChart
        width={100}
        height={300}
        data={data}
        margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
        }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKeyName} />
            <YAxis />
            <Tooltip />
            <Legend />
            {dataKey.map((v, i) => {
              return <Line type="monotone" dataKey={v} stroke="#8884d8" activeDot={{ r: 8 }} />
            })}
        </LineChart>
    </ResponsiveContainer>
   )
   };

export default AnalysisGraph;
