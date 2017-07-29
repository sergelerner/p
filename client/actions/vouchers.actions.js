import * as actionTypes from '../constants/action-types.js';

export const setActiveVoucher = (voucherId) => ({
  type: actionTypes.SET_ACTIVE_VOUCHER,
  voucherId,
});
