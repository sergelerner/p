import * as actionTypes from '../constants/action-types.js';
import u from 'updeep';

import map from 'lodash/map';
import keyBy from 'lodash/keyBy';
import drop from 'lodash/drop';

const initialState = {
  deals: {},
};

export default function (state = initialState, action) {
  switch (action.type) {

    case actionTypes.RECIEVE_DEALS: {
      const { raw } = action;
      const allRowsExceptFirst = drop(raw, [1]);

      return u({
        deals: keyBy(map(allRowsExceptFirst, ({ name, photo, price }) => ({
          name,
          photo,
          price,
        })), 'name'),
      }, state);
    }

    default:
      return state;
  }
}
