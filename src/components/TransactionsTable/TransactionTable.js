import {
  Card,
  Divider,
  IconButton,
  InputBase,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography
} from "@mui/material";
import { Link, Search, Smartphone } from "@mui/icons-material";
import './TransactionsTable.scss';
import { useEffect, useState } from "react";
import TransactionDetail from "../TransactionDetail/TransactionDetail";

const TransactionsTable = ({ data, isLoading, option, formatterField }) => {
  const [search, setSearch] = useState('');
  const [dataFiltered, setDataFiltered] = useState(data);
  const [transactionDetail, setTransactionDetail] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const filteredData = data.filter(item => {
      const searchString = search.toLowerCase();
      const transactionText = getTransactionText(item.status).toLowerCase();
      const formattedDate = formatDate(new Date(item.createdAt)).toLowerCase();
      return (
        item.salesType.toLowerCase().includes(searchString) ||
        transactionText.includes(searchString) ||
        item.paymentMethod.toLowerCase().includes(searchString) ||
        item.id.toLowerCase().includes(searchString) ||
        formattedDate.includes(searchString)
      );
    });
    setDataFiltered(filteredData);
  }, [search, data]);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const getDate = () => {
    const now = new Date();
    const str = now.toLocaleString('default', { month: 'long' });
    const month = str.charAt(0).toUpperCase() + str.slice(1);
    return month;
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  };

  const options = {
    0: 'Hoy',
    1: 'Esta semana',
    2: getDate(),
  };

  const getMount = (amount, deduction = 0, status) => {
    if (status === 'SUCCESSFUL') {
      return (
        <>
          <Typography className="transaction-amount">{formatterField.format(amount)}</Typography>
          <Typography className="transaction-deduction-label">Deducción Bold</Typography>
          <Typography className="transaction-deduction">{`- ${formatterField.format(deduction)}`}</Typography>
        </>
      );
    }
    return (
      <Typography className="transaction-amount">{formatterField.format(amount)}</Typography>
    )
  }

  const getTransactionText = (status) => {
    let text = 'Cobro exitoso';
    if (status === 'REJECTED') {
      text = 'Cobro no realizado';
    }
    return text;
  };

  const handleDetail = (transaction) => {
    setTransactionDetail(transaction);
    setOpen(true);
  };

  const getTransaction = (item) => {
    const { salesType: mode, status } = item;
    let icon = <Smartphone />
    let text = getTransactionText(status);
    if (mode === 'PAYMENT_LINK') {
      icon = <Link />
    }
    return (
      <div className="transaction-text link">
        {icon}
        &nbsp;&nbsp;
        <span>
          {text}
        </span>
      </div>);
  };

  return (
    <div className="transactions-table">
      <Card sx={{ borderRadius: 3 }}>
        <Toolbar
          className='table-bar'
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}>
          <Typography
            sx={{ flex: '1 1 100%', fontSize: 'medium' }}
            variant='h6'
            id='tableTitle'
            component='div'
          >
            {`Tus ventas de ${options[option]}`}
          </Typography>
        </Toolbar>
        <Toolbar className="search-bar-container">
          <Paper component={"form"} className="search-bar" elevation={0}>
            <IconButton>
              <Search />
            </IconButton>
            <InputBase
              fullWidth
              placeholder="Buscar"
              value={search}
              onChange={handleSearch}
            />
          </Paper>
        </Toolbar>
        <Divider />
        <TableContainer sx={{ maxHeight: 470, minHeight: 470 }}>
          {isLoading
            ? (<LinearProgress />)
            : (
              <Table
                size='medium'
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Transacción</TableCell>
                    <TableCell>Fecha y hora</TableCell>
                    <TableCell>Método de pago</TableCell>
                    <TableCell>ID transacción Bold</TableCell>
                    <TableCell>Monto</TableCell>
                  </TableRow>
                </TableHead >
                <TableBody>
                  {dataFiltered.map((item, index) => (
                    <TableRow
                      key={item.id}
                      onClick={() => handleDetail(item)}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#F3F3F3',
                        }
                      }}>
                      <TableCell sx={{
                        borderLeft: `4px solid ${index % 2 === 0 ? '#121E6C90' : '#60606090'}`
                      }}>{getTransaction(item)}</TableCell>
                      <TableCell className="transaction-date">{formatDate(new Date(item.createdAt))}</TableCell>
                      <TableCell className="transaction-date">
                        <div className="transaction-text">
                          {item.paymentMethod}
                        </div>
                      </TableCell>
                      <TableCell className="transaction-id">{item.id}</TableCell>
                      <TableCell>{getMount(item.amount, item.deduction, item.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
        </TableContainer>
      </Card>
      {transactionDetail && <TransactionDetail
        transaction={transactionDetail}
        getTransactionText={getTransactionText}
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        formatterField={formatterField}
        formatDate={formatDate}
      />}
    </div>
  )
};

export default TransactionsTable;
