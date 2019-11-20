import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear } from '@fortawesome/free-solid-svg-icons'
import {  SizeProp,  } from '@fortawesome/fontawesome-svg-core'

interface IProps {
  color?: string;
  size?: SizeProp;
}

const SadTear: React.SFC<IProps> = ({ color = '#5383e8', size = 'lg' }) => (
  <FontAwesomeIcon
    icon={faSadTear}
    color={color}
    size={size}
  />
);

export default SadTear;