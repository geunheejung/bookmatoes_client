import { AxiosResponse } from 'axios';
import { fetchKakaoAPI, Method } from '../';
import { IBookSearchResponse, KAKAO_API_PATH } from './type';

export * from './type';

export const searchBook = async (keyword: string) => {
  if (!keyword) throw false;

  try {
    const res: AxiosResponse<IBookSearchResponse> = await fetchKakaoAPI(
      KAKAO_API_PATH.Book,
      Method.GET,
      { query: keyword }
    );
    return res;
  } catch(e) {    
    throw e;
  }
};