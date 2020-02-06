import request from '../utils/request';

export function check(token) {
  return request({
    url: '/checkin/' + token,
    method: 'get'
  });
}

export function checkin(token, data) {
  return request({
    url: '/checkin/' + token,
    method: 'post',
    data
  });
}
