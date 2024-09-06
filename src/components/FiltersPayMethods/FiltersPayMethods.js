import { Close, Tune } from "@mui/icons-material";
import { Button, Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Menu } from "@mui/material";
import { useEffect, useState } from "react";
import './FiltersPayMethods.scss';

const FiltersPayMethods = ({ handleFilter, filter }) => {
  const [checks, setChecks] = useState({
    TERMINAL: false,
    PAYMENT_LINK: false,
    ALL: false,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setChecks({
      TERMINAL: filter === 'TERMINAL',
      PAYMENT_LINK: filter === 'PAYMENT_LINK',
      ALL: filter === 'ALL',
    });
  }, [filter]);

  const handleCheck = (value) => {
    setChecks({
      TERMINAL: value === 'TERMINAL',
      PAYMENT_LINK: value === 'PAYMENT_LINK',
      ALL: value === 'ALL',
    });
  };

  const validateFilter = () => {
    const selectedFilter = Object.keys(checks).find(check => checks[check]);
    handleFilter(selectedFilter);
    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="filters-pay-methods-container">
      <Button
        id="pos-button"
        className="filters-button"
        endIcon={<Tune />}
        onClick={handleClick}
        aria-haspopup="true"
        aria-controls={open ? 'pos-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
      >Filtrar</Button>
      <Menu
        id="pos-menu"
        aria-labelledby="pos-button"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List
          subheader={
            <ListSubheader component="div" className="filters-subheader"><span>Filtrar</span><IconButton onClick={handleClose}><Close /></IconButton></ListSubheader>
          }
        >
          {['TERMINAL', 'PAYMENT_LINK', 'ALL'].map((method) => (
            <ListItemButton key={method} onClick={() => handleCheck(method)} className="item-button">
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checks[method]}
                  onChange={() => handleCheck(method)}
                />
              </ListItemIcon>
              <ListItemText primary={method === 'TERMINAL' ? 'Cobro con datáfono' : method === 'PAYMENT_LINK' ? 'Cobros con link de pago' : 'Ver todos'} />
            </ListItemButton>
          ))}
          <ListItem>
            <ListItemButton
              className="apply-button"
              onClick={validateFilter}
            >
              <ListItemText primary="Aplicar" />
            </ListItemButton>
          </ListItem>
        </List>
      </Menu>
    </div>
  );
};

export default FiltersPayMethods;
