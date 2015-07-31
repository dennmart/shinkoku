var React = require('react');

module.exports = React.createClass({
  render: function() {
    if (this.props.errorMessage) {
      return <h1>{this.props.errorMessage}</h1>;
    } else {
      return <h1>Main Content!</h1>;
    }
  }
});
