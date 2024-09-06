import { useEffect, useState } from "react";
import Filters from "../Filters/Filters";

import TransactionsTable from "../TransactionsTable/TransactionTable";
import { useDispatch, useSelector, useStore } from "react-redux";
import { changeOptionDate, getTransactions, setFilter } from "../../actions/transactionsAction";
import TotalCard from "../TotalCard/TotalCard";
import './Dashboard.scss';

const Dashboard = () => {
  const [filtersLoaded, setFiltersLoaded] = useState(false);
  const store = useStore();
  const dispatch = useDispatch();
  const transactionsState = useSelector((state = store.getState()) => state.transactions);
  const { optionDate, transactions, filter, isLoading, totalSales } = transactionsState;

  const getMonth = () => {
    const now = new Date();
    const str = now.toLocaleString('default', { month: 'long' });
    const month = str.charAt(0).toUpperCase() + str.slice(1);
    return month;
  }

  useEffect(() => {
    if (!filtersLoaded) {
      const dateFilter = localStorage.getItem('dateFilter');
      const payMethodFilter = localStorage.getItem('payMethodFilter');
      if (dateFilter) {
        dispatch(changeOptionDate(parseInt(dateFilter)));
      }
      if (payMethodFilter) {
        dispatch(setFilter(payMethodFilter));
      }
      setFiltersLoaded(true);
    }
  }, [filtersLoaded, dispatch])

  useEffect(() => {
    if (filtersLoaded) {
      dispatch(getTransactions());
    }
  }, [optionDate, filter, filtersLoaded, dispatch]);

  const handleFilterDate = (e, value) => {
    e.preventDefault();
    dispatch(changeOptionDate(value));
  };

  const handleFilter = (filter) => {
    dispatch(setFilter(filter));
  }

  const formatterField = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });


  return (
    <div className="dashboard-container">
      <div className="total-filters">
        <TotalCard
          option={optionDate}
          totalSales={totalSales}
          formatterField={formatterField}
          isLoading={isLoading}
          getMonth={getMonth}
        />
        <Filters
          handleFilterDate={handleFilterDate}
          option={optionDate}
          handleFilter={handleFilter}
          getMonth={getMonth}
          filter={filter}
        />
      </div>

      <TransactionsTable
        data={transactions}
        isLoading={isLoading}
        option={optionDate}
        formatterField={formatterField}
      />
    </div>
  )
};

export default Dashboard;
