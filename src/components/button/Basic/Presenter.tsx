import React from 'react';
import '../styles.css';

interface IProps {
  styles?: {}; 
  className?: string;
  onClick: () => void;
}

const Presenter: React.FC<IProps> = ({
  children,
  styles,
  className,  
  onClick,
}) => {  
  return (
    <button  
      className={`common-button primry ${className}`}
      style={styles}
      onClick={onClick}
    >
      {children}
    </button>  
  );
};

export default Presenter;
