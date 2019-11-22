export enum KAKAO_API_PATH {
  Book = 'search/book'
}

export interface ISearchBookPayload {
  query: string;
}

export interface IBookDocument {
  /* 제목 및 소개 */
  title: string; // 도서 제목
  contents: string; // 도서 소개  
  /* 가격 */
  price: number; // 도서 정가
  sale_price: number; // 도서 판매가
  /* URL */
  url: string; // 도서 상세 URL
  thumbnail: string; // 도서 표지 썸네일 URL
  /* 출판 정보 */
  publisher: string; // 도서 출판사
  authors: string | string[]; // 도서 저자 리스트
  translators: string | string[]; // 도서 번역자 리스트  
  /* 날짜 */
  datetime: string; // 도서 출판날짜
}

export type TBookDocumentList = IBookDocument[];

export interface IBookSearchResponse {
  documents: TBookDocumentList;
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
}