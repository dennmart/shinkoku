var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var CriticalItems = require('./critical_items');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <div className='row' id='header'>
          <div>
            <img src='assets/wanikani-shinkoku.png' alt='WaniKani' className='logo img-responsive center-block' />
          </div>
        </div>
        <div className='container' id='main_container'>
          <RouteHandler />
        </div>
      </div>
    );
  }
});

var routes = (
  <Route name='app' path='/' handler={App}>
    <Route name="critical_items" path=':apiKey' handler={CriticalItems}/>
    <DefaultRoute handler={CriticalItems}/>
  </Route>
);

Router.run(routes, function (Handler, state) {
  var params = state.params;
  React.render(<Handler params={params} />, document.body);
});
