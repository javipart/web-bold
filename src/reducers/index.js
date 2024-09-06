import { combineReducers } from "redux";
import transactions from "./transactionsReducer";
const reducers = {
  transactions,
};

const reducerMix = combineReducers(reducers);

export default reducerMix;