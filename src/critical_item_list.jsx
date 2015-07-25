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
      var filterTypes = this.props.filterTypes;

      var itemList = this.props.criticalItems.map(function(item, index) {
        if (filterTypes.length == 0 || filterTypes.indexOf(item.type) > -1) {
          return (<ItemInformation key={index} {...item} />);
        }
      });

      return (
        <div className='row'>{itemList}</div>
      )
    }
  }
});
