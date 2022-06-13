import axios, { AxiosRequestConfig } from 'axios';

class HttpClientService {
	/**
	 * GET
	 * @param url
	 * @param config
	 */
	get = async <T,>(url: string, config?: AxiosRequestConfig): Promise<T> => {
		const resp = await axios.get(url, config);
		return resp.data as T;
	};

	/**
	 * POST
	 * @param url
	 * @param data
	 * @param config
	 */
	post = async <T, K>(url: string, data?: T, config?: AxiosRequestConfig): Promise<K> => {
		const resp = await axios.post(url, data, config);
		return resp.data as K;
	};

	/**
	 * PATCH
	 * @param url
	 * @param data
	 * @param config
	 */
	patch = async <T, K>(url: string, data: T, config?: AxiosRequestConfig): Promise<K> => {
		const resp = await axios.patch(url, data, config);
		return resp.data as K;
	};

	/**
	 * PUT
	 * @param url
	 * @param data
	 * @param config
	 */
	put = async <T, K>(url: string, data?: T, config?: AxiosRequestConfig): Promise<K> => {
		const resp = await axios.put(url, data, config);
		return resp.data as K;
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
