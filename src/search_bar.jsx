import React from 'react';
import PropTypes from 'prop-types';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    const { apiKey } = this.props;

    this.state = {
      apiKey: apiKey || '',
      buttonEnabled: false,
    };

    this.handleKeyChange = this.handleKeyChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.searchInputRef = React.createRef();
  }

  componentDidMount() {
    const { apiKey } = this.state;

    if (!apiKey) {
      this.searchInputRef.current.focus();
    }

    this.setState({ buttonEnabled: this.isValidApiKey(apiKey) });
  }

  isValidApiKey() {
    const { apiKey } = this.state;

    const regExp = /^[a-z0-9]{32}$/;
    return regExp.test(apiKey);
  }

  handleKeyChange(event) {
    this.setState({
      apiKey: event.target.value,
      buttonEnabled: this.isValidApiKey(event.target.value),
    });
  }

  handleOnSubmit(event) {
    event.preventDefault();

    const { apiKey } = this.state;
    const { apiKeyChange } = this.props;

    if (this.isValidApiKey()) {
      apiKeyChange(apiKey);
    }
  }

  render() {
    const { apiKey, buttonEnabled } = this.state;

    return (
      <form id="search" className="form-inline" onSubmit={this.handleOnSubmit}>
        <input
          ref={this.searchInputRef}
          type="text"
          className="form-control"
          placeholder="Please enter your WaniKani API key"
          onChange={this.handleKeyChange}
          value={apiKey}
        />
        <button type="submit" className="btn btn-info" disabled={buttonEnabled}>
          <i className="fa fa-arrow-circle-down" />
          Fetch
        </button>
      </form>
    );
  }
}

SearchBar.propTypes = {
  apiKey: PropTypes.string,
  apiKeyChange: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  apiKey: '',
};

export default SearchBar;
