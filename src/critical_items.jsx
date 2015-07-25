var React = require('react');
var $ = require('jquery');
var _ = require('underscore');
var SearchBar = require('./search_bar');
var CriticalItemList = require('./critical_item_list');

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

  handleFilterChange: function(event) {
    var filters = _.clone(this.state.filterTypes);

    if (event.target.checked) {
      filters.push(event.target.value);
    } else {
      filters = _.reject(filters, function(filter) { return filter == event.target.value });
    }
    this.setState({ filterTypes: filters });
  },

  clearFilters: function() {
    this.setState({ filterTypes: [] });
  },

  isFilteredBy: function(type) {
    return _.contains(this.state.filterTypes, type);
  },

  render: function() {
    if (this.state.criticalItems.length > 0) {
      var filterTypeOptions = <div className='row filter-types'>
        <div className='col-md-12 text-center'>
          <div className='title'>Filter by:</div>
          <div className='option'>
            <input type='checkbox' value='radical' checked={this.isFilteredBy('radical')} onChange={this.handleFilterChange} /> Radicals
          </div>
          <div className='option'>
            <input type='checkbox' value='kanji' checked={this.isFilteredBy('kanji')} onChange={this.handleFilterChange} /> Kanji
          </div>
          <div className='option'>
            <input type='checkbox' value='vocabulary' checked={this.isFilteredBy('vocabulary')} onChange={this.handleFilterChange} /> Vocabulary
          </div>
        </div>
      </div>;
    }

    if (this.state.filterTypes.length > 0) {
      var clearFilterLink = <div className='col-md-12 text-center'>
        <a onClick={this.clearFilters}>Clear Filters</a>
      </div>
    }

    return (
      <div>
        <div className='row' id='search'>
          <div className='col-md-4 col-md-offset-4'>
            <SearchBar apiKeyChange={this.apiKeyChange} />
          </div>
        </div>

        <div className='row' id='main_content'>
          <div id='loading'><i className='fa fa-refresh fa-spin'></i></div>
          {filterTypeOptions}
          <div className='row clear-filters'>
            {clearFilterLink}
          </div>
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
