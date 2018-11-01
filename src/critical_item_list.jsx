import React from 'react';
import _ from 'lodash';
import pluralize from 'pluralize';

import ItemInformation from './item_information';
import CriticalItemFilters from './critical_item_filters';

class CriticalItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filterTypes: [] };
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
  }

  handleFilterChange(filters) {
    this.setState({ filterTypes: filters });
  }

  clearFilters() {
    this.setState({ filterTypes: [] });
  }

  render() {
    if (this.props.criticalItems.length > 0) {
      var filterTypeOptions = <CriticalItemFilters
        filterTypes={this.state.filterTypes}
        handleFilterChange={this.handleFilterChange}
        handleClearFilters={this.clearFilters} />;

      var _this = this;
      var itemCount = 0;
      var itemList = this.props.criticalItems.map((item, index) => {
        if (_this.state.filterTypes.length == 0 || _.includes(_this.state.filterTypes, item.type)) {
          itemCount++;
          return <ItemInformation key={index} {...item} />;
        }
      });

      var totalItems = (
        <div>
          <p className='items-total text-center'>Showing {pluralize('item', itemCount, true)}</p>
        </div>
      );
    } else {
      itemList = (
        <div className='bg-success bg-section'>
          <h1 className='text-center'>You currently don't have any critical items.</h1>
          <h1 className='text-center'>Keep up the good work!</h1>
        </div>
      )
    }

    return (
      <div className='row'>
        {totalItems}
        {filterTypeOptions}
        {itemList}
      </div>
    )
  }
}

export default CriticalItemList;
