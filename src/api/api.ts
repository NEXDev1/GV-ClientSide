import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const baseUrl: string = "/api/";

const axiosRequest = async <T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  try {

    const headers = {
      ...config.headers,
      Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : undefined
    };

    const response: AxiosResponse<T> = await axios({
      ...config,
      url: baseUrl + config.url,
      headers: headers
    });
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};
  
export default axiosRequest;