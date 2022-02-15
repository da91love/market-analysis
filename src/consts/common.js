import {KEY_NAME} from '../consts/keyName';

export const LANG = {
  EN: 'en',
  KO: 'ko',
};

export const AVG = "AVG";

export const BLANK = "　";

export const E_PERIOD_DELIMITER = "E";

export const NUM_UNIT = {
  THOU: 1000,
  MIL: 1000000,
  BIL: 1000000000,
  BM: 1000000,
  OK: 100000000,
};

export const PERIOD_UNIT = {
  YEAR: 'year',
  QUARTER: 'quarter',
}

export const F_STATUS_TYPE = {
  BS: 'bs',
  PL: 'pl',
  CF: 'cf',
}

export const SHARE_OR_MARKET = {
  SHARE: 'share',
  MARKET: 'market',
}

export const EXTERNAL_URL = {
  NAVER_SHARE_INFO: 'https://finance.naver.com/item/main.nhn?code=',
  NAVER_MRK_INFO: 'https://finance.naver.com/sise/sise_group_detail.nhn?type=upjong&no=',
  NAVER_SEARCH: 'https://search.naver.com/search.naver?where=news&query=',
  GOOGLE_SEARCH : 'https://www.google.com/search?tbm=nws&q=',
}

export const DEFAULT_SHARE_INFO = {
  [KEY_NAME.SHARE_CODE]: '005930',
  [KEY_NAME.SHARE_NAME]: '삼성전자'
}

export const DEFAULT_MARKET_INFO = {
  [KEY_NAME.MARKET_CODE]: '202',
  [KEY_NAME.MARKET_NAME]: '반도체와반도체장비'
}