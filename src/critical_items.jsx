import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

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

  componentDidMount() {
    const { match } = this.props;

    if (match.params.apiKey) {
      this.setState({ apiKey: match.params.apiKey });
      this.apiKeyChange(match.params.apiKey);
    }
  }

  apiKeyChange(apiKey) {
    const { router } = this.context;

    const loadingSpinner = document.getElementById('loading');

    axios.interceptors.request.use(
      config => {
        loadingSpinner.style.display = 'block';
        return config;
      },
      error => {
        loadingSpinner.style.display = 'block';
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      response => {
        loadingSpinner.style.display = 'none';
        return response;
      },
      error => {
        loadingSpinner.style.display = 'none';
        return Promise.reject(error);
      }
    );

    if (apiKey) {
      router.history.push(apiKey);

      axios
        .get(`https://www.wanikani.com/api/user/${apiKey}/critical-items/80`)
        .then(response => {
          if (response.data.error) {
            this.setState({
              apiKey,
              errorMessage: response.data.error.message,
            });
          } else {
            this.setState({
              apiKey,
              errorMessage: null,
              criticalItems: response.data.requested_information,
            });
          }
        })
        .catch(() => {
          this.setState({
            errorMessage:
              'There was an error making the request to WaniKani. Check your API key and try again.',
          });
        });
    } else {
      this.replaceState(this.getInitialState());
    }
  }

  render() {
    const { match } = this.props;
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
              apiKey={match.params.apiKey}
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
  match: PropTypes.object.isRequired,
};

CriticalItems.contextTypes = { router: PropTypes.object.isRequired };

export default CriticalItems;
