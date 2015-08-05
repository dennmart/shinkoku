var React = require('react');
var Navigation = require('react-router').Navigation;
var $ = require('jquery');
var _ = require('underscore');
var SearchBar = require('./search_bar');
var MainContent = require('./main_content');
var CriticalItemList = require('./critical_item_list');

module.exports = React.createClass({
  mixins: [Navigation],

  getInitialState: function() {
    return {
      apiKey: '',
      criticalItems: [],
      errorMessage: null
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

  componentDidMount: function() {
    if (this.props.params.apiKey) {
      var apiKey = this.props.params.apiKey;
      this.setState({ apiKey: apiKey });
      this.apiKeyChange(apiKey);
    }
  },

  apiKeyChange: function(apiKey) {
    if (apiKey) {
      this.transitionTo('critical_items', { apiKey: apiKey });
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
      this.replaceState(this.getInitialState());
    }
  },

  render: function() {
    if (this.state.errorMessage || this.state.apiKey == '') {
      var content = <MainContent errorMessage={this.state.errorMessage} />;
    } else {
      var content = <CriticalItemList
        criticalItems={this.state.criticalItems}
        filterTypes={this.state.filterTypes} />;
    }

    return (
      <div>
        <div className='container' id='search'>
          <div className='col-md-12 text-center'>
            <SearchBar apiKey={this.props.params.apiKey} apiKeyChange={this.apiKeyChange} />
          </div>
        </div>

        <div className='container' id='main_content'>
          <div id='loading'><i className='fa fa-refresh fa-spin'></i></div>
          {content}
        </div>
      </div>
    )
  }
});
