import { AxiosResponse } from 'axios';
import { kakaoFetch, Method } from '../';
import { IBookSearchResponse, KAKAO_API_PATH, ISearchBookPayload } from './type';

export * from './type';

export const searchBook = async (keyword: string) => {
  if (!keyword) throw false;

  try {  
    const res: AxiosResponse<IBookSearchResponse> = await kakaoFetch.request<ISearchBookPayload>({
      endPoint: KAKAO_API_PATH.Book,
      method: Method.GET,
      payload: { query: keyword }
    });
    return res;
  } catch(e) {    
    throw e;
  }
};