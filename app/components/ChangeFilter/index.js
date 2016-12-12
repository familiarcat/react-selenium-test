// Third party.
import React, { PropTypes } from 'react';
import { FlatButton } from 'material-ui';

const ChangeFilter = ({ activeFilter, filter, onSetFilter, text }) => {
  return (
    <FlatButton
      disabled={filter === activeFilter}
      label={text}
      onTouchTap={() => onSetFilter(filter)}
      style={{ marginLeft : 5, marginRight : 5 }}
      />
  );
};

ChangeFilter.propTypes = {
  activeFilter : PropTypes.string,
  filter       : PropTypes.string,
  onSetFilter  : PropTypes.func,
  text         : PropTypes.string,
};

export default ChangeFilter;
