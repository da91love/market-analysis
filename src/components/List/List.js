import React from 'react';
import {
  MDBRow, MDBContainer, MDBCol,
} from 'mdbreact';
import FieldCard from './FieldCard';

const List = () => (
  <div className="">
    <div>
      <p className="text-center h1 pt-5 pb-5"><strong>업계분석</strong></p>
      <p className="text-center h4">업계별 매출, 성장률, 이익률 등 시장조사에 필요한 데이터를 제공합니다.</p>
      <p className="text-center h4">대분류로 분류된 아래의 업계들을 클릭하여 소분류를 확인하세요.</p>
    </div>
    <div>
      <MDBContainer>
        <MDBRow>
          <MDBCol size="auto">
            <FieldCard title="의료" />
          </MDBCol>
          <MDBCol size="auto">
            <FieldCard title="제조업" />
          </MDBCol>
          <MDBCol size="auto">
            <FieldCard title="도매업" />
          </MDBCol>
          <MDBCol size="auto">
            <FieldCard title="금융업" />
          </MDBCol>
          <MDBCol size="auto">
            <FieldCard title="식료품업" />
          </MDBCol>
          <MDBCol size="auto">
            <FieldCard title="IT" />
          </MDBCol>
          <MDBCol size="auto">
            <FieldCard title="운송업" />
          </MDBCol>
        </MDBRow>
      </MDBContainer>

    </div>

  </div>
);

export default List;
