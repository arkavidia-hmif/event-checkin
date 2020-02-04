import request from '../utils/request';

export function check(token) {
  return request({
    url: '/checkin/' + token,
    method: 'get'
  });
}

export function checkin(token, password) {
  return request({
    url: '/checkin/' + token,
    method: 'post',
    password
  });
}
