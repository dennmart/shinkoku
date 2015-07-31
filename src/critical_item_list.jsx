var React = require('react');
var _ = require('underscore');
var ItemInformation = require('./item_information');
var CriticalItemFilters = require('./critical_item_filters');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      filterTypes: []
    }
  },

  handleFilterChange: function(filters) {
    this.setState({ filterTypes: filters });
  },

  clearFilters: function() {
    this.setState({ filterTypes: [] });
  },

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
      if (this.props.criticalItems.length > 0) {
        var filterTypeOptions = <CriticalItemFilters
          filterTypes={this.state.filterTypes}
          handleFilterChange={this.handleFilterChange}
          handleClearFilters={this.clearFilters} />;
      }

      var _this = this;
      var itemList = this.props.criticalItems.map(function(item, index) {
        if (_this.state.filterTypes.length == 0 || _.contains(_this.state.filterTypes, item.type)) {
          return (<ItemInformation key={index} {...item} />);
        }
      });

      return (
        <div className='row'>
          {filterTypeOptions}
          {itemList}
        </div>
      )
    }
  }
});
