import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import _isString from 'lodash/isString';
import _isEqual from 'lodash/isEqual';
import { Method } from './type';

interface IParams<T> {
  endPoint: string;
  method: Method;
  payload?: T;
}

class Fetch {  
  private initConfig: AxiosRequestConfig;  
  private axiosIstance: AxiosInstance;      

  constructor(url: string, axiosConfig?: AxiosRequestConfig) {    
    this.initConfig  = { url, ...axiosConfig };
    this.axiosIstance = axios.create(this.initConfig);
  }

  public request = async <T, F>(params: IParams<T>) => {                          
    const res: AxiosResponse<F> = await this.axiosIstance.request(this.getConfig(params));    
    return res;
  }
  
  private getConfig = (params: IParams<any>): AxiosRequestConfig => {
    const { GET, POST } = Method;     
    const { initConfig: { url } } = this;
    const { method, endPoint, payload } = params;
    const axiosRequestConfig: AxiosRequestConfig = {
      url: `${url}/${endPoint}`,
      method,
    };
    
    if (!payload) return axiosRequestConfig;

    if (method === GET || method === POST) {    
      axiosRequestConfig[method === GET ? 'params' : 'data'] = payload;
    }

    return axiosRequestConfig;
  };
}

export const kakaoFetch = new Fetch('https://dapi.kakao.com/v3', {
  headers: {
    authorization: `KakaoAK df02aa681731a2f1ccdf67cc5c61ea02` 
  }
});

export const bookFeatch = new Fetch(`http://localhost:8080`);