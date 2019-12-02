export enum Method {
  GET = 'get',
  DELETE = 'delete',
  HEAD = 'head',
  OPTIONS = 'options',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
}

export enum BookApiEndPoint {
  SELLER = 'seller',
}

export interface IBookApiPayload {
  url: string;
};