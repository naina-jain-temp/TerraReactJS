import AES from 'crypto-js/aes';
import ENC from 'crypto-js/enc-utf8';
const SECRET_KEY = 'layzer-secret-key';
export const dataEncrypt = (text) => {
	const encrypted = AES.encrypt(JSON.stringify(text), SECRET_KEY);
	return encrypted.toString();
};

export const dataDecrypt = (text) => {
	let decryptedStr = null;
	if (text) {
		decryptedStr = AES.decrypt(text, SECRET_KEY).toString(ENC);
	}
	try {
		return JSON.parse(decryptedStr);
	} catch (error) {
		return null;
	}
};
