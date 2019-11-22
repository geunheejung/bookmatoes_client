import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { KAKAO_API_PATH, ISearchBookPayload } from './kakao';
import { Method } from './type';

interface IAxiosConfig {
  headers?: {};
  authorization?: string;
  customConfig?: AxiosRequestConfig;
}

export const initAxios = (config: IAxiosConfig): AxiosInstance => {
  const {  
    headers,
    authorization,
    customConfig
  } = config;

  const axiosConfig: AxiosRequestConfig = {
    headers: {
      ...headers
    },
    ...customConfig
  };

  if (!!authorization) axiosConfig.headers.authorization = authorization;

  return axios.create(axiosConfig);
};

interface IFetchParams {
  url: string;
  method: Method;
  payload?: {};
}

const fetchApi = async (
  params: IFetchParams, 
  axiosInstance?: AxiosInstance
) => {
  const { 
    url,
    method,
    payload,
  } = params;

  const requestConfig: AxiosRequestConfig = {
    url,
    method
  };

  if (!!payload) {
    const key = method === Method.GET ? 'params' : 'data';
    requestConfig[key] = payload;
  }

  if (!axiosInstance) return await axios.request(requestConfig);

  return await axiosInstance.request(requestConfig);
};

export const fetchKakaoAPI = async (
  path: KAKAO_API_PATH,
  method: Method,
  payload?: ISearchBookPayload
) => {
  const API_KEY = 'df02aa681731a2f1ccdf67cc5c61ea02';  

  const axiosInstance = initAxios({
    authorization: `KakaoAK ${API_KEY}`
  });
  
  const url = `https://dapi.kakao.com/v3/${path}`;

  return await fetchApi({ url, method, payload }, axiosInstance);
};