var React = require('react');

module.exports = React.createClass({
  render: function() {
    var characterDisplay;

    if (this.props.character == null) {
      characterDisplay = (<img src={this.props.image} />);
    } else {
      characterDisplay = this.props.character;
    }

    return (
      <div className={'row ' + this.props.type}>
        <div className='col-md-4'>{characterDisplay}</div>
        <div className='col-md-4'>{this.props.meaning}</div>
      </div>
    )
  }
});
