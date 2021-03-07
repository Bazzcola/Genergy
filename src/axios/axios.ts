import $axios from 'axios';
// import env from '@beam-australia/react-env';
import { load, remove } from 'react-cookies';
import { getRoute } from 'estafette-router';
import { routes } from '../router/routes';
import { useHistory } from 'estafette-router';

export const { push } = useHistory();

export const axios = $axios.create();
// eslint-disable-next-line import/no-named-as-default-member
export const cancelToken = $axios.CancelToken;

axios.defaults.headers['Accept-Language'] = load('localization') || 'en';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = 'https://genergy-backend.herokuapp.com';
// axios.defaults.baseURL = env('API_URL');

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if ($axios.isCancel(error)) {
      // eslint-disable-next-line
      return Promise.reject({ cancel: true, message: 'The endpoint was cancelled' });
    }

    if (error.response) {
      if (error.response.status === 401) {
        remove('token', { path: '/' });
        remove('pwd_token', { path: '/' });

        push(getRoute(routes, 'Login', { query: { user_not_found: true } }));
      }

      if (
        error.response.status === 403 &&
        error.response.data.detail === 'You do not have permission to perform this action.'
      ) {
        push(getRoute(routes, 'Login', { query: { permissions_guard: true } }));
      }
    }

    return Promise.reject(error);
  },
);

export const axiosHeadersUpdater = (): void => {
  const token = load('token');

  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else if (axios.defaults.headers.common.Authorization) {
    delete axios.defaults.headers.common.Authorization;
  }
};

axiosHeadersUpdater();