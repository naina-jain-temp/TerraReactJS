import { dataDecrypt, dataEncrypt } from './crypto';

class Storage {
	static set(key, value) {
		window.sessionStorage.setItem(key, dataEncrypt(value));
	}

	static get(key) {
		let item =  window.sessionStorage.getItem(key);
		if (item) {
			return dataDecrypt(item);
		} else {
			return false;
		}
	}

	static remove(key) {
		window.sessionStorage.removeItem(key);
		if (key === 'token') {
			window.location.href = '/login';
		}
	}
}

export default Storage;
