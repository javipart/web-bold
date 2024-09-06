import { ACTIONS, initialState } from '../models/constants';

const transactionsReducer = (state = initialState.transactions, action = {}) => {
  switch (action.type) {
    case ACTIONS.GET_TRANSACTIONS.GET:
      return { ...state, transactions: action.data };
    case ACTIONS.GET_TRANSACTIONS.OPTION_DATE:
      return { ...state, optionDate: action.value };
    case ACTIONS.GET_TRANSACTIONS.SET_LOADING_TRANSACTIONS:
      return { ...state, isLoading: action.value };
    case ACTIONS.GET_TRANSACTIONS.TOTAL_SALES:
      return { ...state, totalSales: action.value };
    case ACTIONS.GET_TRANSACTIONS.FILTER:
      return { ...state, filter: action.value };
    default:
      return state;
  }
};

export default transactionsReducer;
