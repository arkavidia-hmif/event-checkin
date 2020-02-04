import axios from 'axios';

const service = axios.create({
  baseURL: 'https://staging.api.arkavidia.id/api/'
});

export default service;
