import React from 'react';
import '../styles.css';

interface IProps {
  styles?: {}; 
  className?: string;
}

const Presenter: React.FC<IProps> = ({
  children,
  styles,
  className,  
}) => {  
  return (
    <button  
      className={`common-button primry ${className}`}
      style={styles}
    >
      {children}
    </button>  
  );
};

export default Presenter;
