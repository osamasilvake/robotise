import { StorageTypeEnum } from './index.enum';

class StorageService {
	/**
	 * check if item exist in local or session storage
	 * @param key
	 * @param storageType
	 */
	exist = (key: string, storageType?: StorageTypeEnum): boolean => {
		switch (storageType) {
			case StorageTypeEnum.PERSISTANT:
				return localStorage.getItem(key) !== null;

			case StorageTypeEnum.SESSION:
				return sessionStorage.getItem(key) !== null;

			default:
				return localStorage.getItem(key) !== null;
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
			case StorageTypeEnum.PERSISTANT:
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
	 * get item from local or session storage
	 * @param key
	 * @param storageType
	 */
	get = (key: string, storageType?: StorageTypeEnum) => {
		switch (storageType) {
			case StorageTypeEnum.PERSISTANT:
				if (this.exist(key, StorageTypeEnum.PERSISTANT)) {
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
				const value = localStorage.getItem(key) || '';
				return value ? JSON.parse(value) : value;
			}
		}
	};

	/**
	 * remove item from local or session storage
	 * @param key
	 * @param storageType
	 */
	remove = (key: string, storageType?: StorageTypeEnum) => {
		switch (storageType) {
			case StorageTypeEnum.PERSISTANT:
				if (this.exist(key, StorageTypeEnum.PERSISTANT)) {
					localStorage.removeItem(key);
				}
				break;

			case StorageTypeEnum.SESSION:
				if (this.exist(key, StorageTypeEnum.SESSION)) {
					sessionStorage.removeItem(key);
				}
				break;

			default:
				if (this.exist(key, StorageTypeEnum.PERSISTANT)) {
					localStorage.removeItem(key);
				}
		}
	};
}
const instance = new StorageService();
export default instance;
