import React from 'react';
import {
  MDBCol, MDBCard, MDBRow, MDBCardBody, MDBContainer, MDBIcon, MDBCardTitle, MDBCardText, MDBBtn, MDBCardImage, MDBCardHeader,
} from 'mdbreact';

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
          <MDBCol size="2">
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>
                  <MDBIcon fab icon="android" />
                  Card title
                </MDBCardTitle>
                <MDBCardText>
                  shit
                </MDBCardText>
                <MDBBtn href="#">MDBBtn</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>

  </div>
);

export default List;
