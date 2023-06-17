import axios from 'axios';
import { API_URL } from '../constants';
import { ARTICLES_MOCK } from '../__mock__';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export async function get(url) {
  if (process.env.REACT_APP_ENABLE_MOCK === 'true') {
    return new Promise((res) => {
      setTimeout(() => {
        res(ARTICLES_MOCK)
      }, 2000)
    })
  }

  const { data } = await axiosInstance.request({
    method: 'GET',
    url: url,
    responseType: 'json',
  });

  return data;
}

export async function post(url, model) {
  const res = await axiosInstance.request({
    method: 'POST',
    url: url,
    responseType: 'json',
    data: model,
  });

  return res;
}

export async function put(url, model) {
  const res = await axiosInstance.request({
    method: 'PUT',
    url: url,
    responseType: 'json',
    data: model,
  });

  return res;
}

export async function _delete(url) {
  const res = await axiosInstance.request({
    method: 'delete',
    url: url,
  });

  return res;
}
