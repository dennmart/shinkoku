var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      buttonEnabled: false
    };
  },

  isValidApiKey: function(apiKey) {
    regExp = /^[a-z0-9]{32}$/;
    return regExp.test(apiKey);
  },

  handleKeyChange: function(event) {
    this.setState({
      apiKey: event.target.value,
      buttonEnabled: this.isValidApiKey(event.target.value)
    });
  },

  handleOnSubmit: function(event) {
    event.preventDefault();

    var apiKey = this.state.apiKey;
    if (this.isValidApiKey(apiKey)) {
      this.props.apiKeyChange(apiKey);
    }
  },

  render: function() {
    return (
      <form id='search' className='form-inline' onSubmit={this.handleOnSubmit}>
        <input
          type='text'
          className='form-control'
          placeholder='Please enter your WaniKani API key'
          onChange={this.handleKeyChange} />
        <button className='btn btn-info' disabled={!this.state.buttonEnabled}>
          Fetch
        </button>
      </form>
    )
  }
});
