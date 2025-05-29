const CryptoJS = require('crypto-js');

export async function decryptTextFile(url, password) {
	try {
		const res = await fetch(url);
		const encryptedText = await res.text();

		const bytes = CryptoJS.AES.decrypt(encryptedText, password);
		const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

		if (!decryptedText)
			throw new Error('Incorrect password or corrupt file.');
		return decryptedText;
	} catch (err) {
		console.error('Decryption failed:', err);
		return null;
	}
}
