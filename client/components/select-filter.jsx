import React, { Component, PropTypes } from 'react';
import Select from 'react-select';

class SelectFilter extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
  }

  handleChange(selection) {
    const { filterName, userFilter } = this.props;
    if (selection) {
      this.setState({
        value: selection.name,
      });
      userFilter(filterName, selection.name, !selection.isActive);
    } else {
      this.setState({
        value: '',
      });
      userFilter(filterName, '', false);
    }
  }

  render() {
    const { value } = this.state;
    const { list } = this.props;
    return (
      <Select
          className="filter__select"
          placeholder="Где вы хотите путешествовать"
          labelKey={"name"}
          value={{ name: value }}
          options={list}
          onChange={::this.handleChange}
      />
    );
  }
}

SelectFilter.propTypes = {
  filterName: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    isActive: PropTypes.bool,
  })),
  userFilter: PropTypes.func,
};

export default SelectFilter;
