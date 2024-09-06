import { HelpOutline } from "@mui/icons-material"
import { Card, CardContent, CardHeader, CircularProgress, Tooltip, Typography, CardActions } from "@mui/material"
import './TotalCard.scss';

const TotalCard = ({ option, isLoading, formatterField, totalSales, getMonth }) => {
  const options = {
    0: 'Hoy',
    1: 'Esta semana',
    2: getMonth(),
  };

  const getDate = () => {
    const now = new Date();
    const month = getMonth();
    if (option === 0) {
      return `${month} ${now.getDate()}`;
    } else if (option === 1) {
      return `${month} ${now.getDate() - now.getDay()} - ${month} ${now.getDate()}`;
    } else {
      return `${month} ${now.getFullYear()}`;
    }
  }

  return (
    <Card className="total-card">
      <CardHeader
        title={`Total de ventas de ${options[option]}`}
        action={
          <Tooltip title='Total de ventas sin comisión de Bold'>
            <HelpOutline />
          </Tooltip>}
        className="total-card-header"
      />
      <CardContent className="total-card-content">
        <Typography variant='h4'>
          {isLoading ? <CircularProgress /> : formatterField.format(totalSales)}
        </Typography>
      </CardContent>
      <CardActions className="total-card-footer">
        <Typography variant='h7'>
          {getDate()}
        </Typography>
      </CardActions>
    </Card>
  )
};

export default TotalCard;
