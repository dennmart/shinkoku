import React from 'react';
import PropTypes from 'prop-types';
import includes from 'lodash/includes';
import clone from 'lodash/clone';
import reject from 'lodash/reject';

class CriticalItemFilters extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  isFilteredBy(type) {
    const { filterTypes } = this.props;
    return includes(filterTypes, type);
  }

  handleFilterChange(event) {
    const { filterTypes, handleFilterChange } = this.props;
    let filters = clone(filterTypes);

    if (event.target.checked) {
      filters.push(event.target.value);
    } else {
      filters = reject(filters, filter => filter === event.target.value);
    }

    handleFilterChange(filters);
  }

  render() {
    const { filterTypes, handleClearFilters } = this.props;
    let clearFilterLink = null;

    if (filterTypes.length > 0) {
      clearFilterLink = (
        <button type="button" onClick={handleClearFilters}>
          Clear Filters
        </button>
      );
    }

    return (
      <div>
        <div className="row filter-types">
          <div className="col-md-12 text-center">
            <div className="title">Filter by:</div>
            <div className="option">
              <input
                type="checkbox"
                value="radical"
                checked={this.isFilteredBy('radical')}
                onChange={this.handleFilterChange}
              />{' '}
              Radicals
            </div>
            <div className="option">
              <input
                type="checkbox"
                value="kanji"
                checked={this.isFilteredBy('kanji')}
                onChange={this.handleFilterChange}
              />{' '}
              Kanji
            </div>
            <div className="option">
              <input
                type="checkbox"
                value="vocabulary"
                checked={this.isFilteredBy('vocabulary')}
                onChange={this.handleFilterChange}
              />{' '}
              Vocabulary
            </div>
          </div>
        </div>
        <div className="row clear-filters">
          <div className="col-md-12 text-center">{clearFilterLink}</div>
        </div>
      </div>
    );
  }
}

CriticalItemFilters.propTypes = {
  filterTypes: PropTypes.array.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  handleClearFilters: PropTypes.func.isRequired,
};

export default CriticalItemFilters;
