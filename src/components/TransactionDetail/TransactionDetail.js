import { CheckCircle, Close, Error, Link, Smartphone } from "@mui/icons-material";
import { Divider, IconButton, List, ListItem, ListItemText, SwipeableDrawer } from "@mui/material";
import './TransactionDetail.scss';

const TransactionDetail = ({
  transaction,
  getTransactionText,
  open,
  handleClose,
  formatterField,
  formatDate,
  setOpen
}) => {
  const isMobile = window.innerWidth < 600;

  const getTransaction = (item) => {
    const { salesType: mode, status } = item;
    let icon = <Smartphone />
    let text = getTransactionText(status);
    if (mode === 'PAYMENT_LINK') {
      icon = <Link />
    }
    return (
      <div className="transaction-text">
        {icon}
        &nbsp;&nbsp;
        <span>
          {text}
        </span>
      </div>);
  };

  return (
    <div className="detail-card">
      <SwipeableDrawer
        anchor={isMobile ? "bottom" : "right"}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            height: isMobile ? '60%' : '100%',
            maxHeight: '100vh',
            width: isMobile ? '100%' : '400px',
          }
        }}
        onOpen={() => setOpen(true)}
      >
        <div className="detail-close">
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </div>
        <div className="detail-card-header">
          <List>
            <ListItem>
              <ListItemText>
                {transaction.status === 'SUCCESSFUL'
                  ? <CheckCircle color="success"/>
                  : <Error color="error"/>
                }</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText className="detail-dark">{`!${getTransactionText(transaction.status)}!`}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText className="detail-blue">{formatterField.format(transaction.amount)}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText className="detail-light">{formatDate(new Date(transaction.createdAt))}</ListItemText>
            </ListItem>
          </List>
        </div>
        <div className="detail-card-body">
          <List>
            <ListItem>
              <ListItemText className="detail-label">ID transacción Bold</ListItemText>
              <ListItemText className="detail-dark">{transaction.id}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText className="detail-label">Deducción Bold</ListItemText>
              <ListItemText className="detail-red">{`- ${formatterField.format(transaction.deduction || 0)}`}</ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText className="detail-label">Método de pago</ListItemText>
              <ListItemText className="detail-light">{transaction.paymentMethod}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText className="detail-label">Tipo de pago</ListItemText>
              <ListItemText className="detail-dark">{getTransaction(transaction)}</ListItemText>
            </ListItem>
          </List>
        </div>
      </SwipeableDrawer>
    </div>
  )
};

export default TransactionDetail;
