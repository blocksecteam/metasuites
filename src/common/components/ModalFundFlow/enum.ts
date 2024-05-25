export enum NodeType {
  NORMAL = 1,
  CROSS_CHAIN,
  OTHER_CHAIN
}

export enum ErrorType {
  NO_LOGIN = 1,
  NO_PERMISSION = 2,
  OTHER = 3
}

export enum ErrorCode {
  ERR_NO_LOGIN = 40100000,
  ERR_LOGIN_EXPIRE = 40100001,
  ERR_NO_AUTH = 40100002
}

export enum MetaSleuthPlan {
  NO_LOGIN = 'NO_LOGIN',
  FREE = 'FREE',
  BASIC = 'BASIC',
  PRO = 'PRO',
  ULTRA = 'ULTRA'
}
