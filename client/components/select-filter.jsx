import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { list, placeholder } = this.props;
    return (
      <Select
          className="filter__select"
          placeholder={placeholder}
          labelKey={"name"}
          value={(value) ? { name: value } : ''}
          options={list}
          onChange={::this.handleChange}
      />
    );
  }
}

SelectFilter.propTypes = {
  filterName: PropTypes.string,
  placeholder: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    isActive: PropTypes.bool,
  })),
  userFilter: PropTypes.func,
};

export default SelectFilter;
