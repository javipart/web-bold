import axios from "axios";

export const getTransactionsApi = async (dateFilter, payMethodFilter) => {
  const response = await axios('https://bold-fe-api.vercel.app/api');
  if (response.status === 200) {
    const { data } = response.data;
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
  } else {
    throw new Error('Get gtransactions Error');
  }
};
