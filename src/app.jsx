import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import CriticalItems from './critical_items';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <div className="row" id="header">
          <div>
            <img
              src="assets/wanikani-shinkoku.png"
              alt="WaniKani"
              className="logo img-responsive center-block"
            />
          </div>
        </div>
        <div className="container" id="main_container">
          <Route path="/:apiKey?" component={CriticalItems} />
        </div>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('container'));
