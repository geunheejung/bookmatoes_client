import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './screens/Home';
import Detail from './screens/Detail';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App main-wrapper" >
        <Route path="/" component={Home} />
        <Route path="/:bookId" component={Detail} />
      </div>
    </Router>
  );
};

export default App;
