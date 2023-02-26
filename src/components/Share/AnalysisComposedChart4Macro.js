import React from 'react';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Bar, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { MDBBtnGroup, MDBBtn } from 'mdbreact';
import {useTranslation} from "react-i18next";
import { GRAPH_LINE_COLOR } from "../../consts/graph";

const AnalysisComposedChart4Macro = (props) => {
    const {label=true, legend=false, graphData, id} = props;
    const { t } = useTranslation();
    const {idc, xAxisKeyName, dataKey, data} = graphData;
    
    /**
     * yAxisId, dataKey="noc" 등 하드코딩된 부분이 매우 많아 수정필요
     */
    return (
    <div className="mb-5">
        {label?<label className="mt-2 mb-0 h2 float-left">{t(`common.rawData.${idc}`)}</label>:null}
        <MDBBtnGroup className="mb-4 float-right" shadow='0' aria-label='Basic example'>
            <MDBBtn color='Secondary' outline>최대</MDBBtn>
            <MDBBtn color='Secondary' outline>10년</MDBBtn>
            <MDBBtn color='Secondary' outline>5년</MDBBtn>
            <MDBBtn color='Secondary' outline>1년</MDBBtn>
        </MDBBtnGroup>
        <ResponsiveContainer className="p-3" width="100%" height={300}>
            <ComposedChart width={730} height={300} data={data} margin={{top: 10,right: 30,bottom: 20,}}>
                <XAxis dataKey={xAxisKeyName} style={{fontSize: '1rem'}}/>
                <YAxis yAxisId={1} orientation={"left"} style={{fontSize: '1rem'}} unit={'조'}/>
                <YAxis yAxisId={2} orientation={"right"} style={{fontSize: '1rem'}}  unit={'%'}/>
                <CartesianGrid strokeDasharray="3 3" />
                <Line yAxisId={1} dataKey={'gdp'} stroke="#8884d8" strokeWidth={1} dot={false}/>
                <Line yAxisId={1} dataKey={'m2'} stroke="#ff7300" strokeWidth={1} dot={false}/>
                <Line yAxisId={1} dataKey={'mv'} stroke="#82ca9d" strokeWidth={1} dot={false}/>
                <Line yAxisId={2} dataKey={'mvPerGdp'} stroke="#000000" strokeWidth={1} dot={false}/>
                <Line yAxisId={2} dataKey={'mvPerM2'} stroke="#999999" strokeWidth={1} dot={false}/>
                {legend?<Legend verticalAlign="top"/>:null}
                <Tooltip />

            </ComposedChart>

        </ResponsiveContainer>
    </div>
    )
   };

export default AnalysisComposedChart4Macro;
