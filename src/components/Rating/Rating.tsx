import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { bookRating, ISellerApiRequest, IRatingResponse } from '../../services/api';
import './styles.css';

interface IProps extends ISellerApiRequest {  }

interface IState {
  response?: IRatingResponse;
  isSpinner: boolean;
}

class Rating extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      response: undefined,
      isSpinner: false,
    }
  } 


  componentDidMount() {
    this.init();
  }

  init = () => {
    this.setState({ isSpinner: true }, this.getBookRating);
  }

  getBookRating = async () => {
    try {
      const { siteName, url } = this.props;
      const { data } = await bookRating(siteName, url);
      this.setState({ response: data, isSpinner: false });
    } catch (e) {
      this.updateIsSpinnerBy();
    }  
  };

  updateIsSpinnerBy = (isSpinner: boolean = false) => {
    this.setState({ isSpinner });
  }

  render() {
    const { siteName } = this.props;    
    const { response, isSpinner } = this.state;
    return (
      <div className="rating-item">
        <h1>{siteName}</h1>
        <div>
          {
            isSpinner 
              ? <Loader 
                  type="Plane"
                  height={40}
                />
              : response && response.totalCount
          }          
        </div>
      </div>
    );
  }
}

export default Rating;