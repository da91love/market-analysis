import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {useTranslation} from "react-i18next";
import { GRAPH_LINE_COLOR } from "../../consts/graph";

const AnalysisGraph = (props) => {
    const {label=true, legend=false, graphData, id} = props;
    const { t } = useTranslation();
    const {idc, xAxisKeyName, dataKey, data} = graphData;
      
   return (
    <div className="mb-5">
        {label?<label className="mt-2 mb-0 h2 float-left">{t(`common.rawData.${idc}`)}</label>:null}
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
                {legend?<Legend />:null}
                <Tooltip />
                {dataKey.map((v, i) => {
                    return <Line type="monotone" dataKey={v} stroke={GRAPH_LINE_COLOR[i]} activeDot={{ r: 8 }} />
                })}
            </LineChart>
        </ResponsiveContainer>
    </div>
   )
   };

export default AnalysisGraph;
