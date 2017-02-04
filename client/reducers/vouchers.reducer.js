import * as actionTypes from '../constants/action-types.js';
import u from 'updeep';

const initialState = {
  hasRecievedVouchers: false,
};

export default function (state = initialState, action) {
  switch (action.type) {

    case actionTypes.RECIEVE_VOUCHERS: {
      const { vouchersRaw } = action;
      return u({
        hasRecievedVouchers: true,
        vouchersRaw,
      }, state);
    }

    default:
      return state;
  }
}
