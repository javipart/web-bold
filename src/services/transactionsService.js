import axios from "axios";

export const getTransactionsApi = async () => {
  const response = await axios('https://bold-fe-api.vercel.app/api');
  if (response.status === 200) {
    const { data } = response.data;
    return data;
  } else {
    throw new Error('Get gtransactions Error');
  }
};
