import axios, { AxiosRequestConfig } from 'axios';

class HttpClientService {
	/**
	 * GET
	 * @param url
	 * @param config
	 */
	get = async (url: string, config?: AxiosRequestConfig) => {
		const resp = await axios.get(url, config);
		return resp.data;
	};

	/**
	 * POST
	 * @param url
	 * @param data
	 * @param config
	 */
	post = async <T,>(url: string, data?: T, config?: AxiosRequestConfig) => {
		const resp = await axios.post(url, data, config);
		return resp.data;
	};

	/**
	 * PATCH
	 * @param url
	 * @param data
	 * @param config
	 */
	patch = async <T,>(url: string, data: T, config?: AxiosRequestConfig) => {
		const resp = await axios.patch(url, data, config);
		return resp.data;
	};

	/**
	 * DELETE
	 * @param url
	 * @param config
	 */
	delete = async (url: string, config?: AxiosRequestConfig) => {
		const resp = await axios.delete(url, config);
		return resp.data;
	};
}
const instance = new HttpClientService();
export default instance;
