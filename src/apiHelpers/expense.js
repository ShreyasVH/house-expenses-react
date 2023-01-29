import { post } from '../utils/api';
import {expenseRoutes} from '../constants/apiRoutes';

const endpoint = process.env.REACT_APP_API_ENDPOINT;

export const saveExpense = async (payload) => {
  const url = endpoint + expenseRoutes.SAVE_EXPENSE;
  return post(url, payload);
};


export const getExpensesByFilter = async (payload) => {
  const url = endpoint + expenseRoutes.FILTER_EXPENSES;
  return post(url, payload);
};

