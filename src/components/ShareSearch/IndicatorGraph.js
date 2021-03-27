import React, {useState, useEffect} from 'react';
import {MDBCard, MDBCardTitle, MDBCardText} from 'mdbreact';
import rawData2GraphData from '../../utils/rawData2GraphData';
import AnalysisGraph from '../Share/AnalysisGraph';
import GraphTypeSelectModal from '../Share/GraphTypeSelectModal';
import { BY_SHARE_DEFAULT_GRAPH_TYPE, BY_SHARE_ALL_GRAPH_TYPE } from '../../consts/graph';

const IndicatorGraph = (props) => {
    const {periodRawDataByShare} = props;
    const [selectedGraphType, setSelectedGraphType] = useState(BY_SHARE_DEFAULT_GRAPH_TYPE);
    const [graphData, setGraphData] = useState();

    // Get data for graphData
    const createGraphData = (selectedGraphType, periodRawDataByShare) => {
        const idcByPeriod = {};

        selectedGraphType.forEach((v, i) => {
            idcByPeriod[v] = rawData2GraphData(periodRawDataByShare, v);
        })

        return idcByPeriod;
    };

    useEffect(() => {
        const gData = createGraphData(selectedGraphType, periodRawDataByShare);
        setGraphData(gData);
    }, [periodRawDataByShare, selectedGraphType])

    return (
    <MDBCard className="card-body">
        <MDBCardTitle className="h3">
            <span>주요지표 추세</span>
            <GraphTypeSelectModal selectedGraphType={selectedGraphType} setSelectedGraphType={setSelectedGraphType} allGraphType={BY_SHARE_ALL_GRAPH_TYPE}/>
        </MDBCardTitle>
        <MDBCardText>
            {graphData?
            Object.keys(graphData).map((v, i) => {
                return <AnalysisGraph graphData={graphData[v]} id={i}/>
            })
            :null}
        </MDBCardText>
    </MDBCard> 
    )
};

export default IndicatorGraph;
