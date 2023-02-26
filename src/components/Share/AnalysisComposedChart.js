import React from 'react';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Bar, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {useTranslation} from "react-i18next";
import { GRAPH_LINE_COLOR } from "../../consts/graph";

const AnalysisComposedChart = (props) => {
    const {label=true, legend=false, graphData, id} = props;
    const { t } = useTranslation();
    const {idc, xAxisKeyName, dataKey, data} = graphData;
    
    /**
     * yAxisId, dataKey="noc" 등 하드코딩된 부분이 매우 많아 수정필요
     */
    return (
    <div className="mb-5">
        {label?<label className="mt-2 mb-0 h2 float-left">{t(`common.rawData.${idc}`)}</label>:null}
        <ResponsiveContainer className="p-3" width="100%" height={300}>
            <ComposedChart width={730} height={300} data={data} margin={{top: 10,right: 30,bottom: 20,}}>
                <XAxis dataKey={xAxisKeyName} style={{fontSize: '1rem'}}/>
                <YAxis yAxisId={1} orientation={"left"} style={{fontSize: '1rem'}} unit={'조'}/>
                <YAxis yAxisId={2} orientation={"right"} style={{fontSize: '1rem'}} unit={'사'}/>
                <CartesianGrid strokeDasharray="3 3" />
                <Line yAxisId={1} dataKey={dataKey[0]} stroke="#ff7300" strokeWidth={2}/>
                <Bar yAxisId={2} dataKey="noc" barSize={20} fill="#888686" />
                {legend?<Legend verticalAlign="top"/>:null}
                <Tooltip />

            </ComposedChart>

        </ResponsiveContainer>
    </div>
    )
   };

export default AnalysisComposedChart;
