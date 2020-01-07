import produce from 'immer';

export interface IBookSeller {
  siteName: string;
  url: string;
}

export interface IBookRating {
  count: string;
  totalCount: string;
}

export type BookRating = IBookRating[];
export type BookSeller = IBookSeller[];

// as const로 선언해주지않으면 프로퍼티로 할당되었을때 해당 프로퍼티를 타입 유추하는 과정에서 const 형태가 아닌 stirng 형태로 된다.
export const REQUEST_RATING = 'book/REQUEST_RATING' as const;
export const SUCCESE_RATING = 'book/SUCCESE_RATING' as const;
export const FAIL_RATING = 'book/FAIL_RATING' as const;
export const REQUEST_SELLER = 'book/REQUEST_SELLEr' as const;
export const SUCCESE_SELLER = 'book/SUCCESE_SELLEr' as const;
export const FAIL_SELLER = 'book/FAIL_SELLEr' as const;
export const UPDATE_SPINNER_BY = 'book/UPDATE_SPINNER_BY' as const;

export const requestRating = (seller: IBookSeller) => ({
  type: REQUEST_RATING,
  payload: seller
});
export const successRating = (key: string, rating: IBookRating) => ({
  type: SUCCESE_RATING,
  payload: {
    key,
    rating,
  }
});
export const failureRating = () => ({ type: FAIL_RATING });
export const requestSeller = (url: string) => ({
  type: REQUEST_SELLER,
  payload: { url }
});
export const successSeller = (sellerList: BookSeller) => ({
  type: SUCCESE_SELLER,
  payload: sellerList
});
export const failureSeller = () => ({ type: FAIL_SELLER });

type BookAction =
  ReturnType<typeof requestRating> |
  ReturnType<typeof successRating> |
  ReturnType<typeof failureRating> |
  ReturnType<typeof requestSeller> |
  ReturnType<typeof successSeller> |
  ReturnType<typeof failureSeller>

export interface BookState {
  ratingList: {    
    [index: string]: {
      data?: IBookRating,
      isSpinner: boolean,
    },    
  };
  seller: BookSeller;
  isSellerSpinner: boolean;
}

const initalState: BookState = {
  seller: [],
  ratingList: {},
  isSellerSpinner: false,
};

const book = (state: BookState = initalState, action: BookAction) => {
  switch (action.type) {
    /* 책 판매처 API */
    case REQUEST_SELLER: 
      return produce(state, draft => {
        draft.isSellerSpinner = true;
      });      
    case SUCCESE_SELLER:
      return produce(state, draft => {
        draft.seller = action.payload;
        draft.isSellerSpinner = false;
      });            
    case FAIL_SELLER:
      return state;
    /* 책 평점 API */
    case REQUEST_RATING:
      return produce(state, draft => {
        const { payload: { siteName } } = action;
        draft.ratingList[siteName] = {
          isSpinner: true,
        };
      });      
    case SUCCESE_RATING:      
      return produce(state, draft => {
        const { payload: { key, rating } } = action;

        draft.ratingList[key] = {
          data: rating,
          isSpinner: false
        };
      });      
    case FAIL_RATING:
      return state;
    default:
      return state;
  }
}

export default book;
