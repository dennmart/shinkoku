var React = require('react');
var SearchBar = require('./search_bar');
var CriticalItemList = require('./critical_item_list');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      apiKey: '',
      criticalItems: [],
      error: null
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
      jQuery.ajax({
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

  render: function() {
    return (
      <div>
        <div className='row' id='header'>
          <div className='col-md-6'>
            Logo
          </div>
          <div className='col-md-6'>
            <SearchBar apiKeyChange={this.apiKeyChange} />
          </div>
        </div>

        <div className='row' id='main_content'>
          <div id='loading'><i className='fa fa-refresh fa-spin'></i></div>
          <CriticalItemList apiKey={this.state.apiKey} errorMessage={this.state.errorMessage} criticalItems={this.state.criticalItems} />
        </div>
      </div>
    )
  }
});
