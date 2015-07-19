var React = require('react');
var ItemInformation = require('./item_information');

module.exports = React.createClass({
  render: function() {
    if (this.props.errorMessage) {
      return (
        <h3>There was an error: {this.props.errorMessage}</h3>
      )
    } else if (this.props.apiKey == '') {
      return (
        <h3>Please enter your API key.</h3>
      )
    } else {
      var itemList = this.props.criticalItems.map(function(item, index) {
        return (<ItemInformation key={index} {...item} />)
      });

      return (
        <div className='row'>{itemList}</div>
      )
    }
  }
});
