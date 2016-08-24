import React from 'react';
import ReactDOM from 'react-dom';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: this.props.apiKey || '',
      buttonEnabled: false
    };
    this.handleKeyChange = this.handleKeyChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.searchInput).focus();
    this.setState({ buttonEnabled: this.isValidApiKey(this.state.apiKey) });
  }

  isValidApiKey(apiKey) {
    var regExp = /^[a-z0-9]{32}$/;
    return regExp.test(apiKey);
  }

  handleKeyChange(event) {
    this.setState({
      apiKey: event.target.value,
      buttonEnabled: this.isValidApiKey(event.target.value)
    });
  }

  handleOnSubmit(event) {
    event.preventDefault();

    var apiKey = this.state.apiKey;
    if (this.isValidApiKey(apiKey)) {
      this.props.apiKeyChange(apiKey);
    }
  }

  render() {
    return (
      <form id='search' className='form-inline' onSubmit={this.handleOnSubmit}>
        <input
          ref='searchInput'
          type='text'
          className='form-control'
          placeholder='Please enter your WaniKani API key'
          onChange={this.handleKeyChange}
          value={this.state.apiKey} />
        <button className='btn btn-info' disabled={!this.state.buttonEnabled}>
          <i className='fa fa-arrow-circle-down'></i>
          Fetch
        </button>
      </form>
    )
  }
}

export default SearchBar;
