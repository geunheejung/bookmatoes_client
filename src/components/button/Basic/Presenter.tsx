import React from 'react';
import '../styles.css';

interface IProps {
  styles?: {}; 
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}

const Presenter: React.FC<IProps> = ({
  children,
  styles,
  className,
  disabled,
  onClick,
}) => {  
  console.log('disabled- >', disabled);
  return (
    <button        
      className={`common-button primry ${className}`}
      style={styles}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>  
  );
};

export default Presenter;
