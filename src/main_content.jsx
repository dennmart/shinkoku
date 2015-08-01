var React = require('react');

module.exports = React.createClass({
  render: function() {
    if (this.props.errorMessage) {
      var content = <div className='bg-danger wanikani-error-msg'>
        <h3>Whoops! There was an error fetching your data from WaniKani.</h3>
        <p>The Crabigator says: <strong>{this.props.errorMessage}</strong></p>
    </div>;
    } else {
      var content = <div>
        <h1>Shinkoku</h1>
        <p>Quickly check which WaniKani radicals, kanji or vocabulary you're having a bit of difficulty with.</p>
        <p>To begin, just enter your <a href='https://www.wanikani.com/api' target='_blank'>WaniKani API Key</a> above.</p>
      </div>;
    }

    return <div>
      <div className='col-md-12 text-center'>
        {content}
      </div>
    </div>
  }
});
