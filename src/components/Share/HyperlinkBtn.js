import React from 'react';

const HyperlinkBtn = (props) => {
    const {searchValue, shareCode} = props; 

    return (
        <a href={`https://finance.naver.com/item/main.nhn?code=${shareCode}`} target="_blank">{searchValue}</a>
    )
}

export default HyperlinkBtn;