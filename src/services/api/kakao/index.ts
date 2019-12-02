import { AxiosResponse } from 'axios';
import { kakaoFetch, Method } from '../';
import { IBookSearchResponse, KAKAO_API_PATH, ISearchBookPayload } from './type';

export * from './type';

export const searchBook = async (keyword: string) => {
  if (!keyword) throw false;

  try {  
    const res = await kakaoFetch.request<ISearchBookPayload, IBookSearchResponse>({
      endPoint: KAKAO_API_PATH.Book,
      method: Method.GET,
      payload: { query: keyword }
    });
    return res;
  } catch(e) {    
    throw e;
  }
};