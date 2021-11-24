import { StorageTypeEnum } from './Storage.enum';

class StorageService {
	/**
	 * check if item exist in local or session storage
	 * @param key
	 * @param storageType
	 */
	exist = (key: string, storageType?: StorageTypeEnum): boolean => {
		switch (storageType) {
			case StorageTypeEnum.PERSISTENT:
				return localStorage.getItem(key) !== null;

			case StorageTypeEnum.SESSION:
				return sessionStorage.getItem(key) !== null;

			default:
				return localStorage.getItem(key) !== null || sessionStorage.getItem(key) !== null;
		}
	};

	/**
	 * get item from local or session storage
	 * @param key
	 * @param storageType
	 */
	get = (key: string, storageType?: StorageTypeEnum) => {
		switch (storageType) {
			case StorageTypeEnum.PERSISTENT:
				if (this.exist(key, StorageTypeEnum.PERSISTENT)) {
					const value = localStorage.getItem(key);
					return value ? JSON.parse(value) : value;
				}
				break;

			case StorageTypeEnum.SESSION:
				if (this.exist(key, StorageTypeEnum.SESSION)) {
					const value = sessionStorage.getItem(key);
					return value ? JSON.parse(value) : value;
				}
				break;

			default: {
				const value = sessionStorage.getItem(key) || localStorage.getItem(key);
				return value ? JSON.parse(value) : `${value}`;
			}
		}
	};

	/**
	 * set item to local or session storage
	 * @param key
	 * @param value
	 * @param storageType
	 */
	put = <T,>(key: string, value: T, storageType?: StorageTypeEnum) => {
		switch (storageType) {
			case StorageTypeEnum.PERSISTENT:
				localStorage.setItem(key, JSON.stringify(value));
				break;

			case StorageTypeEnum.SESSION:
				sessionStorage.setItem(key, JSON.stringify(value));
				break;

			default:
				localStorage.setItem(key, JSON.stringify(value));
		}
	};

	/**
	 * remove item from local or session storage
	 * @param key
	 * @param storageType
	 */
	remove = (key: string, storageType?: StorageTypeEnum) => {
		switch (storageType) {
			case StorageTypeEnum.PERSISTENT:
				if (this.exist(key, StorageTypeEnum.PERSISTENT)) {
					localStorage.removeItem(key);
				}
				break;

			case StorageTypeEnum.SESSION:
				if (this.exist(key, StorageTypeEnum.SESSION)) {
					sessionStorage.removeItem(key);
				}
				break;

			default:
				if (this.exist(key)) {
					localStorage.removeItem(key);
					sessionStorage.removeItem(key);
				}
		}
	};
}
const instance = new StorageService();
export default instance;
