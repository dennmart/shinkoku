import React from 'react';
import PropTypes from 'prop-types';
import includes from 'lodash/includes';
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
    const { criticalItems } = this.props;
    const { filterTypes } = this.state;

    let filterTypeOptions = null;
    let itemList = null;
    let totalItems = null;

    if (criticalItems.length > 0) {
      filterTypeOptions = (
        <CriticalItemFilters
          filterTypes={filterTypes}
          handleFilterChange={this.handleFilterChange}
          handleClearFilters={this.clearFilters}
        />
      );

      let itemCount = 0;
      itemList = criticalItems.map(item => {
        if (filterTypes.length === 0 || includes(filterTypes, item.type)) {
          const itemKey = `${item.level}-${item.type}-${item.meaning}`;
          itemCount += 1;
          return <ItemInformation key={itemKey} {...item} />;
        }

        return null;
      });

      totalItems = (
        <div>
          <p className="items-total text-center">
            Showing {pluralize('item', itemCount, true)}
          </p>
        </div>
      );
    } else {
      itemList = (
        <div className="bg-success bg-section">
          <h1 className="text-center">
            You currently don&apos;t have any critical items.
          </h1>
          <h1 className="text-center">Keep up the good work!</h1>
        </div>
      );
    }

    return (
      <div className="row">
        {totalItems}
        {filterTypeOptions}
        {itemList}
      </div>
    );
  }
}

CriticalItemList.propTypes = {
  criticalItems: PropTypes.array.isRequired,
};

export default CriticalItemList;
