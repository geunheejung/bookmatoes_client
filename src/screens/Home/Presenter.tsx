import React from 'react';
import Search from '../../containers/Search';
import './styles.css';

interface IProps {
  
}

const Presenter: React.FC<IProps> = () => {
  return (
    <div className="home-screen">
      <div className="search-wrapper">
        <Search />
      </div>
    </div>
  )
}

export default Presenter;
