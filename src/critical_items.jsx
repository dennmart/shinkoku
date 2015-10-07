import React from 'react';
import $ from 'jquery';
import _ from 'underscore';

import SearchBar from './search_bar';
import MainContent from './main_content';
import CriticalItemList from './critical_item_list';

class CriticalItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: '',
      criticalItems: [],
      errorMessage: null
    };
    this.apiKeyChange = this.apiKeyChange.bind(this);
  }

  componentWillMount() {
    $(document)
      .ajaxStart(() => {
        $('#loading').show();
      })
      .ajaxStop(() => {
        $('#loading').hide();
      });
  }

  componentDidMount() {
    if (this.props.params.apiKey) {
      var apiKey = this.props.params.apiKey;
      this.setState({ apiKey: apiKey });
      this.apiKeyChange(apiKey);
    }
  }

  apiKeyChange(apiKey) {
    if (apiKey) {
      $.ajax({
        url: 'https://www.wanikani.com/api/user/' + apiKey + '/critical-items/80',
        cache: false,
        dataType: 'jsonp',
        success: (data, textStatus, jqXHR) => {
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
        error: (jqXHR, textStatus, errorThrown) => {
          this.setState({
            errorMessage: "There was an error making the request to WaniKani. Check your API key and try again."
          });
        }.bind(this)
      });
    } else {
      this.replaceState(this.getInitialState());
    }
  }

  render() {
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
}

export default CriticalItems;
