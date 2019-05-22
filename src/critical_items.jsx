import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import SearchBar from './search_bar';
import MainContent from './main_content';
import CriticalItemList from './critical_item_list';

class CriticalItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: '',
      criticalItems: [],
      errorMessage: null,
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
    const { params } = this.props;

    if (params.apiKey) {
      const { apiKey } = params;
      this.setState({ apiKey });
      this.apiKeyChange(apiKey);
    }
  }

  apiKeyChange(apiKey) {
    const { router } = this.context;

    if (apiKey) {
      router.push(apiKey);

      $.ajax({
        url: `https://www.wanikani.com/api/user/${apiKey}/critical-items/80`,
        cache: false,
        dataType: 'jsonp',
        success: data => {
          if (data.error) {
            this.setState({
              apiKey,
              errorMessage: data.error.message,
            });
          } else {
            this.setState({
              apiKey,
              errorMessage: null,
              criticalItems: data.requested_information,
            });
          }
        },
        error: () => {
          this.setState({
            errorMessage:
              'There was an error making the request to WaniKani. Check your API key and try again.',
          });
        },
      });
    } else {
      this.replaceState(this.getInitialState());
    }
  }

  render() {
    const { params } = this.props;
    const { errorMessage, apiKey, criticalItems, filterTypes } = this.state;
    let content = null;

    if (errorMessage || apiKey === '') {
      content = <MainContent errorMessage={errorMessage} />;
    } else {
      content = (
        <CriticalItemList
          criticalItems={criticalItems}
          filterTypes={filterTypes}
        />
      );
    }

    return (
      <div>
        <div className="container" id="search">
          <div className="col-md-12 text-center">
            <SearchBar
              apiKey={params.apiKey}
              apiKeyChange={this.apiKeyChange}
            />
          </div>
        </div>

        <div className="container" id="main_content">
          <div id="loading">
            <i className="fa fa-refresh fa-spin" />
          </div>
          {content}
        </div>
      </div>
    );
  }
}

CriticalItems.propTypes = {
  params: PropTypes.object.isRequired,
};

CriticalItems.contextTypes = { router: PropTypes.object.isRequired };

export default CriticalItems;
