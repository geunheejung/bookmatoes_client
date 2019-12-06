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
  RATING = 'rating',
}

export interface IBookApiPayload {
  url: string;
};

export interface ISellerApiRequest {
  siteName: string;
  url: string;
}

export type SellerApiResponse = ISellerApiRequest[];

export interface IRatingResponse {
  count: string;
  totalCount: string;
};
