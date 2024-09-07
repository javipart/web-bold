import { ACTIONS, initialState } from '../models/constants';

const setDataFilters = (data, dateFilter, payMethodFilter) => {
  const now = new Date();

  let result = [];
  const filterByMonth = (data) => {
    const currentMonth = now.getMonth();
    return data.filter(item => new Date(item.createdAt).getMonth() === currentMonth);
  };

  const filterByWeek = (data) => {
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    return data.filter(item => new Date(item.createdAt) >= startOfWeek);
  };

  const filterByDay = (data) => {
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    return data.filter(item => new Date(item.createdAt) >= startOfDay);
  };

  switch (dateFilter) {
    case 2:
      result = filterByMonth(data);
      break;
    case 1:
      result = filterByWeek(data);
      break;
    default:
      result = filterByDay(data);
      break;
  }
  if (payMethodFilter !== 'ALL') {
    result = result.filter(item => item.salesType === payMethodFilter);
  }
  return result;
}

const transactionsReducer = (state = initialState.transactions, action = {}) => {
  let data;
  let dateFilter;
  let payMethodFilter;
  let result;
  let totalSales = 0;
  switch (action.type) {
    case ACTIONS.GET_TRANSACTIONS.GET:
      return { ...state, transactions: action.data, filteredTransactions: action.data };
    case ACTIONS.GET_TRANSACTIONS.OPTION_DATE:
      data = state.transactions;
      dateFilter = action.value;
      payMethodFilter = state.filter;
      result = setDataFilters(data, dateFilter, payMethodFilter);
      result.forEach(item => {
        if (item.status === 'SUCCESSFUL') {
          totalSales += item.amount;
        }
      });
      return { ...state, optionDate: action.value, filteredTransactions: result, totalSales };
    case ACTIONS.GET_TRANSACTIONS.SET_LOADING_TRANSACTIONS:
      return { ...state, isLoading: action.value };
    case ACTIONS.GET_TRANSACTIONS.TOTAL_SALES:
      return { ...state, totalSales: action.value };
    case ACTIONS.GET_TRANSACTIONS.FILTER:
      data = state.transactions;
      dateFilter = state.optionDate;
      payMethodFilter = action.value;
      result = setDataFilters(data, dateFilter, payMethodFilter);
      result.forEach(item => {
        if (item.status === 'SUCCESSFUL') {
          totalSales += item.amount;
        }
      });
      return { ...state, filter: action.value, filteredTransactions: result, totalSales };
    default:
      return state;
  }
};

export default transactionsReducer;
