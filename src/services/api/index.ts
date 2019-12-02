import { bookFeatch } from './utils';
import { BookApiEndPoint, Method, IBookApiPayload } from './type';

export const bookSellers = async (payload: IBookApiPayload) => {
  return await bookFeatch.request({
    endPoint: `${BookApiEndPoint.SELLER}/${payload.bookId}`,
    method: Method.GET,    
  });
};

export * from './type';
export * from './utils';