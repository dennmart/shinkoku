var React = require('react');
var $ = require('jquery');
var _ = require('underscore');
var SearchBar = require('./search_bar');
var CriticalItemList = require('./critical_item_list');
var CriticalItemFilters = require('./critical_item_filters');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      apiKey: '',
      criticalItems: [],
      error: null,
      filterTypes: []
    }
  },

  componentWillMount: function() {
    $(document)
      .ajaxStart(function () {
        $('#loading').show();
      })
      .ajaxStop(function () {
        $('#loading').hide();
      });
  },

  apiKeyChange: function(apiKey) {
    if (apiKey) {
      $.ajax({
        url: 'https://www.wanikani.com/api/user/' + apiKey + '/critical-items/80',
        cache: false,
        dataType: 'jsonp',
        success: function(data, textStatus, jqXHR) {
          if (data.error) {
            this.setState({
              apiKey: apiKey,
              errorMessage: data.error.message
            });
          } else {
            this.setState({
              apiKey: apiKey,
              errorMessage: null,
              criticalItems: data.requested_information
            });
          }
        }.bind(this),
        error: function(jqXHR, textStatus, errorThrown) {
          this.setState({
            errorMessage: "There was an error making the request to WaniKani. Check your API key and try again."
          });
        }.bind(this)
      });
    } else {
      this.setState({
        apiKey: '',
        errorMessage: null
      });
    }
  },

  handleFilterChange: function(filters) {
    this.setState({ filterTypes: filters });
  },

  clearFilters: function() {
    this.setState({ filterTypes: [] });
  },

  render: function() {
    if (this.state.criticalItems.length > 0) {
      var filterTypeOptions = <CriticalItemFilters
        filterTypes={this.state.filterTypes}
        handleFilterChange={this.handleFilterChange}
        handleClearFilters={this.clearFilters} />;
    }

    return (
      <div>
        <div className='row' id='search'>
          <div className='col-md-4 col-md-offset-4'>
            <SearchBar apiKeyChange={this.apiKeyChange} />
          </div>
        </div>

        <div className='container' id='main_content'>
          <div id='loading'><i className='fa fa-refresh fa-spin'></i></div>
          {filterTypeOptions}
          <CriticalItemList
            apiKey={this.state.apiKey}
            errorMessage={this.state.errorMessage}
            criticalItems={this.state.criticalItems}
            filterTypes={this.state.filterTypes} />
        </div>
      </div>
    )
  }
});
