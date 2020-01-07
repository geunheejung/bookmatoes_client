import React, { PureComponent } from 'react';

interface Props {
  isLoading?: boolean;  
}
interface State {
  
}

export default class Container extends PureComponent<Props, State> {
  state = {}

  render() {
    const { children, isLoading = true } = this.props;
    return isLoading ? <div>Loading....</div> : children;
  }
}
