import React from 'react';
import './styles.css';

interface IProps {
    
}

const Button: React.SFC<{ styles?: {}, className: string }> = ({ styles, className }) => (
  <button  
    className={`common-button primry ${className}`}
    style={styles}
  >
    평점 보기
  </button>  
);

const Presenter: React.FC<IProps> = () => {
  return (    
    <div className="detail-wrapper">      
      <div className="thumbnail-wrapper">
        {/* 썸네일 */}
        <img src="http://image.kyobobook.co.kr/images/book/large/342/l9788996991342.jpg" alt=""/>
      </div>
      {/* 서브 */}
      <div className="info-wrapper">
        <h1 className="book-title">미움받을 용기</h1>
        <p className="book-source">
        기시미 이치로 , 고가 후미타케 지음 | 전경아 옮김 | 김정운 감수 | 인플루엔셜 | 2014년 11월 17일 출간
        </p>
        <p className="book-content">
        그의 고민에 “인간은 변할 수 있고, 누구나 행복해 질 수 있다. 단 그러기 위해서는 ‘용기’가 필요하다”고 말한 철학자가 있다. 바로 프로이트, 융과 함께 ‘심리학의 3대 거장’으로 일컬어지고 있는 알프레드 아들러다.  『미움받을 용기』는 아들러 심리학에 관한 일본의 1인자 철학자 기시미 이치로와 베스트셀러 작가인 고가 후미타케의 저서로, 아들러의 심리학을 ‘대화체’로 쉽고 맛깔나게 정리하고 있다. 아들러 심리학을 공부한 철학자와 세상에 부정적이고 열등감  
        </p>
        <div className="book-rating">
          <Button className="show-rating-btn">
            평점 보기
          </Button>  
        </div>        
      </div>      
    </div>
  )
}

export default Presenter;
