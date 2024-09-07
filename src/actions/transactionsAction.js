import { ACTIONS } from "../models/constants";
import { getTransactionsApi } from '../services/transactionsService';

const getTransactionsSuccess = data => ({ type: ACTIONS.GET_TRANSACTIONS.GET, data });
const changeOptionDateSuccess = value => ({ type: ACTIONS.GET_TRANSACTIONS.OPTION_DATE, value });
const setLoadingSuccess = value => ({ type: ACTIONS.GET_TRANSACTIONS.SET_LOADING_TRANSACTIONS, value });
const setFilterSuccess = value => ({ type: ACTIONS.GET_TRANSACTIONS.FILTER, value });

export function getTransactions() {
  return (dispatch) => {
    dispatch(setLoadingSuccess(true));
    return getTransactionsApi().then((data) => {
      dispatch(getTransactionsSuccess(data));
      dispatch(setLoadingSuccess(false));
    }).catch(e => {
      dispatch(setLoadingSuccess(false));
    });
  }
}

export function changeOptionDate(option) {
  return dispatch => {
    localStorage.setItem('dateFilter', option);
    dispatch(changeOptionDateSuccess(option));
  };
}

export function setFilter(value) {
  return dispatch => {
    localStorage.setItem('payMethodFilter', value);
    dispatch(setFilterSuccess(value));
  }
}