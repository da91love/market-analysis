import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Bar, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { MDBBtnGroup, MDBBtn } from 'mdbreact';
import {useTranslation} from "react-i18next";
import { GRAPH_LINE_COLOR } from "../../consts/graph";

const AnalysisComposedChart4Macro = (props) => {
    const {label=true, legend=false, graphData, id} = props;
    const { t } = useTranslation();
    const {idc, xAxisKeyName, dataKey, data} = graphData;
    const [dataCutByPeriod, setDataCutByPeriod] = useState(data);

    const cutPeriodBy = (tgPeriod) => {
        if (tgPeriod == null) {
            // Set
            setDataCutByPeriod(data);
        } else {
            // Set date info
            const tgDate = new Date();
            tgDate.setFullYear(tgDate.getFullYear() - tgPeriod);

            const startYear = (tgDate.getFullYear()).toString();
            const startMonth = `0${tgDate.getMonth()}`.slice(-2);
            const startDay = `0${tgDate.getDate()}`.slice(-2);

            const startDate = `${startYear}/${startMonth}/${startDay}`;
            
            // Get index
            const startIdx = _.findIndex(data, (obj) => {return obj.name == startDate});
            const endIdx = data.length - 1;

            // Slice data
            const cutData = data.slice(startIdx, endIdx);

            // Set
            setDataCutByPeriod(cutData);
        }
    }

    const periodClickHandler = (tgPeriod) => {
        cutPeriodBy(tgPeriod);
    }

    /**
     * yAxisId, dataKey="noc" 등 하드코딩된 부분이 매우 많아 수정필요
     */
    return (
    <div className="mb-5">
        {label?<label className="mt-2 mb-0 h2 float-left">{t(`common.rawData.${idc}`)}</label>:null}
        <MDBBtnGroup className="mb-3 float-right" shadow='0' aria-label='Basic example'>
            <MDBBtn outline rounded color='dark' onClick={()=> {periodClickHandler(null)}}>최대</MDBBtn>
            <MDBBtn outline rounded color='dark' onClick={()=> {periodClickHandler(10)}}>10년</MDBBtn>
            <MDBBtn outline rounded color='dark' onClick={()=> {periodClickHandler(5)}}>5년</MDBBtn>
            <MDBBtn outline rounded color='dark' onClick={()=> {periodClickHandler(3)}}>3년</MDBBtn>
            <MDBBtn outline rounded color='dark' onClick={()=> {periodClickHandler(1)}}>1년</MDBBtn>
        </MDBBtnGroup>
        <ResponsiveContainer className="p-3" width="100%" height={300}>
            <ComposedChart width={730} height={300} data={dataCutByPeriod} margin={{top: 10,right: 30,bottom: 20,}}>
                <XAxis dataKey={xAxisKeyName} style={{fontSize: '1rem'}}/>
                <YAxis yAxisId={1} orientation={"left"} style={{fontSize: '1rem'}} unit={'조'}/>
                <YAxis yAxisId={2} orientation={"right"} style={{fontSize: '1rem'}}  unit={'%'}/>
                <CartesianGrid strokeDasharray="3 3" />
                <Line yAxisId={1} dataKey={'gdp'} stroke="#8884d8" strokeWidth={1} dot={false}/>
                <Line yAxisId={1} dataKey={'m2'} stroke="#ff7300" strokeWidth={1} dot={false}/>
                <Line yAxisId={1} dataKey={'mv'} stroke="#82ca9d" strokeWidth={1} dot={false}/>
                <Line yAxisId={2} dataKey={'mvPerGdp'} stroke="#000000" strokeWidth={1} dot={false}/>
                <Line yAxisId={2} dataKey={'mvPerM2'} stroke="#999999" strokeWidth={1} dot={false}/>
                {legend?<Legend verticalAlign="bottom"/>:null}
                <Tooltip />

            </ComposedChart>

        </ResponsiveContainer>
    </div>
    )
   };

export default AnalysisComposedChart4Macro;
