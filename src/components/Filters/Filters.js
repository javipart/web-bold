import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import FiltersPayMethods from "../FiltersPayMethods/FiltersPayMethods";
import './Filters.scss';

const Filters = ({ handleFilterDate, option, handleFilter, filter }) => {

  const getDate = () => {
    const now = new Date();
    const dateString = now.toLocaleString('es-CO', { month: 'long' });
    const month = dateString.charAt(0).toUpperCase() + dateString.slice(1);
    return month;
  };

  return (
    <div className="filters-container">
      <BottomNavigation
        showLabels
        value={option}
        onChange={handleFilterDate}
        className="bottom-navigation"
      >
        <BottomNavigationAction
          className={`bottom-navigation-action ${option === 0 ? 'active' : ''}`}
          label='Hoy'
        />
        <BottomNavigationAction
          className={`bottom-navigation-action ${option === 1 ? 'active' : ''}`}
          label='Esta semana'
        />
        <BottomNavigationAction
          className={`bottom-navigation-action ${option === 2 ? 'active' : ''}`}
          label={getDate()}
        />
      </BottomNavigation>
      <FiltersPayMethods
        handleFilter={handleFilter}
        filter={filter}
      />
    </div>
  )
};

export default Filters;