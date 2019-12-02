import { bookFeatch } from './utils';
import { BookApiEndPoint, Method, IBookApiPayload } from './type';

export const bookSellers = (payload: IBookApiPayload) => {
  const { url } = payload;
  const findText = 'bookId=';
  const bookId = url.substring(url.indexOf(findText) + findText.length, url.length);

  return bookFeatch.request<undefined, string[]>({
    endPoint: `${BookApiEndPoint.SELLER}/${bookId}`,
    method: Method.GET,    
  });
}

export * from './type';
export * from './utils';