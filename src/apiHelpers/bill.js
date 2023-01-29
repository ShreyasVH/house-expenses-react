import { get, post } from '../utils/api';
import { billRoutes } from '../constants/apiRoutes';

const endpoint = process.env.REACT_APP_API_ENDPOINT;

export const getCategories = async () => {
  const url = endpoint + billRoutes.GET_CATEGORIES;
  return get(url);
};

export const getSubCategories = async () => {
  const url = endpoint + billRoutes.GET_SUB_CATEGORIES;
  return get(url);
};

export const getCompanies = async () => {
  const url = endpoint + billRoutes.GET_COMPANIES;
  return get(url);
};

export const saveBill = async (payload) => {
  const url = endpoint + billRoutes.SAVE_BILL;
  return post(url, payload);
}

export const getBillsByFilter = async (payload) => {
  const url = endpoint + billRoutes.FILTER_BILLS;
  return post(url, payload);
}

export const getBillById = async (id) => {
  const url = endpoint + billRoutes.GET_BILL.replace('{id}', id);
  return get(url);
}