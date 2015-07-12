var React = require('react');

module.exports = React.createClass({
  handleKeyDown: function(event) {
    if (event.key === 'Enter') {
      this.props.apiKeyChange(event.target.value);
    }
  },

  render: function() {
    return (
      <input type='text' className='form-control' onKeyDown={this.handleKeyDown} />
    )
  }
});
