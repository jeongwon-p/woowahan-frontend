import axios from 'axios';
import { push } from 'connected-react-router';

const CONNECTION_INFO = {
  develop: 'http://localhost:3000',
  production: 'http://localhost:3000'
};

const ajax = axios.create({
  baseURL: CONNECTION_INFO.develop,
  responseType: 'json'
});

const curInterceptors = {
  request: 0,
  response: 0
};

const ejectInterceptors = () => {
  const { request, response } = curInterceptors;
  ajax.interceptors.request.eject(request);
  ajax.interceptors.response.eject(response);
};

const addJwtTokenInterceptor = (jwtToken: any) => {
  const curInterceptor = curInterceptors.request;
  ajax.interceptors.request.eject(curInterceptor);

  curInterceptors.request = ajax.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${jwtToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

const addSignOutInterceptor = (signOutFunc: any) => {
  const curInterceptor = curInterceptors.response;
  ajax.interceptors.response.eject(curInterceptor);
  curInterceptors.response = ajax.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const isSignInRequest = error.config.url
        === `${CONNECTION_INFO.develop}/api/members` && error.config.method === 'post';
      const noResponse = !error.response;
      const expired = error.response && error.response.status === 401 && !isSignInRequest;

      if (noResponse || expired) {
        signOutFunc();
        alert('Session expired. Please login again.');
        push('http://localhost:3000/sign');
      }
      return Promise.reject(error);
    }
  );
};

export { addSignOutInterceptor, addJwtTokenInterceptor, ejectInterceptors };
export default ajax;
