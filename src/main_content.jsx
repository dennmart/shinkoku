import React from 'react';
import PropTypes from 'prop-types';

const MainContent = ({ errorMessage }) => {
  if (errorMessage) {
    return (
      <div className="col-md-12 text-center">
        <div className="bg-danger bg-section">
          <h3>Whoops! There was an error fetching your data from WaniKani.</h3>
          <p>
            The Crabigator says: <strong>{errorMessage}</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="col-md-12 text-center">
      <h1>Shinkoku</h1>
      <p>
        Quickly check which WaniKani radicals, kanji or vocabulary items
        you&apos;re having difficulty with.
        <br />
        It will return all items that you have answered correctly less than 80%
        of the times it&apos;s appeared in your reviews.
      </p>
      <p>
        To begin, just enter your{' '}
        <a
          href="https://www.wanikani.com/api"
          target="_blank"
          rel="noopener noreferrer"
        >
          WaniKani API Key
        </a>{' '}
        above.
      </p>
    </div>
  );
};

MainContent.propTypes = {
  errorMessage: PropTypes.string,
};

MainContent.defaultProps = {
  errorMessage: null,
};

export default MainContent;
