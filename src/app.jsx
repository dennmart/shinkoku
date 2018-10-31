import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import CriticalItems from './critical_items';

class App extends React.Component {
  render() {
    return (
      <div>
        <div className='row' id='header'>
          <div>
            <img src='assets/wanikani-shinkoku.png' alt='WaniKani' className='logo img-responsive center-block' />
          </div>
        </div>
        <div className='container' id='main_container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

var routes = (
  <Route path='/' component={App}>
    <IndexRoute component={CriticalItems}/>
    <Route path=':apiKey' component={CriticalItems}/>
  </Route>
);

ReactDOM.render(<Router history={browserHistory}>{routes}</Router>, document.getElementById('container'));
