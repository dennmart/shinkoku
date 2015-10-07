import React from 'react';
import _ from 'underscore';

class CriticalItemFilters extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  isFilteredBy(type) {
    return _.contains(this.props.filterTypes, type);
  }

  handleFilterChange(event) {
    var filters = _.clone(this.props.filterTypes);

    if (event.target.checked) {
      filters.push(event.target.value);
    } else {
      filters = _.reject(filters, function(filter) { return filter == event.target.value });
    }

    this.props.handleFilterChange(filters);
  }

  render() {
    if (this.props.filterTypes.length > 0) {
      var clearFilterLink = <a onClick={this.props.handleClearFilters}>Clear Filters</a>;
    }

    return <div>
      <div className='row filter-types'>
        <div className='col-md-12 text-center'>
          <div className='title'>Filter by:</div>
          <div className='option'>
            <input type='checkbox' value='radical' checked={this.isFilteredBy('radical')} onChange={this.handleFilterChange} /> Radicals
          </div>
          <div className='option'>
            <input type='checkbox' value='kanji' checked={this.isFilteredBy('kanji')} onChange={this.handleFilterChange} /> Kanji
          </div>
          <div className='option'>
            <input type='checkbox' value='vocabulary' checked={this.isFilteredBy('vocabulary')} onChange={this.handleFilterChange} /> Vocabulary
          </div>
        </div>
      </div>
      <div className='row clear-filters'>
        <div className='col-md-12 text-center'>
          {clearFilterLink}
        </div>
      </div>
    </div>
  }
}

export default CriticalItemFilters;
