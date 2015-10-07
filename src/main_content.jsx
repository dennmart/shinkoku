import React from 'react';

class MainContent extends React.Component {
  render() {
    if (this.props.errorMessage) {
      var content = <div className='bg-danger bg-section'>
        <h3>Whoops! There was an error fetching your data from WaniKani.</h3>
        <p>The Crabigator says: <strong>{this.props.errorMessage}</strong></p>
    </div>;
    } else {
      var content = <div>
        <h1>Shinkoku</h1>
        <p>
          Quickly check which WaniKani radicals, kanji or vocabulary items you're having difficulty with.
          <br />
          It will return all items that you have answered correctly less than 80% of the times it's appeared in your reviews.
        </p>
        <p>To begin, just enter your <a href='https://www.wanikani.com/api' target='_blank'>WaniKani API Key</a> above.</p>
      </div>;
    }

    return (<div className='col-md-12 text-center'>
      {content}
    </div>)
  }
}

export default MainContent;
