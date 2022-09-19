import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {useTranslation} from "react-i18next";
import { GRAPH_LINE_COLOR } from "../../consts/graph";

const AnalysisLineChart = (props) => {
    const {label=true, legend=false, graphData, id} = props;
    const { t } = useTranslation();
    const {idc, xAxisKeyName, dataKey, data} = graphData;
      
   return (
    <div className="mb-5">
        {label?<label className="mt-2 mb-0 h2 float-left">{t(`common.rawData.${idc}`)}</label>:null}
        <ResponsiveContainer className="p-3" width="100%" height={300}>
            <LineChart
                height={300}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    bottom: 20,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xAxisKeyName} style={{fontSize: '1rem'}}/>
                <YAxis style={{fontSize: '1rem'}}/>
                {legend?<Legend verticalAlign="top"/>:null}
                <Tooltip />
                {dataKey.map((v, i) => {
                    return <Line type="monotone" dataKey={v} stroke={GRAPH_LINE_COLOR[i]} activeDot={{ r: 8 }} />
                })}
            </LineChart>
        </ResponsiveContainer>
    </div>
   )
   };

export default AnalysisLineChart;
