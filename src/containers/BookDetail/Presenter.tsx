import React from 'react'

interface Props {
  
}

const Presenter: React.FC<Props> = () => {
  return (
    <div>
      {/* 메인 */}
      <div>
        {/* 썸네일 */}
        <img src="" alt=""/>
      </div>
      {/* 서브 */}
      <div>
        {/* 책 정보 */}
        <p>

        </p>
        {/* 평점 리스트 */}
        <ul>
          <li>
            <span>출판사</span>
            <span>평점</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Presenter
