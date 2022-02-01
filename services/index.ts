import axios from 'axios';

// export const URL = 'http://localhost:5050';
export const URL = 'https://bellitrix.ru';

const $api = axios.create({
	// withCredentials: true,
	baseURL: `${URL}/api`,
});

$api.interceptors.request.use(
    config => {
      return {
        ...config,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          'Accept': 'application/json'
        },
      };
    },
    error => Promise.reject(error)
  );
  

export default $api;