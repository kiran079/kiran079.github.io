const fs = require('fs');
const path = require('path');
const CryptoJS = require('crypto-js');

/*
 * WARNING: add inputPath to .gitignore
 * Do NOT commit the actual password
 */

const password = '<password>'; // Replace when running this script
const inputPath = './public/assets/blog/private-raw/'; // Input folder with .txt files
const outputPath = './public/assets/blog/private/'; // Encrypted output folder

if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath);

fs.readdirSync(inputPath).forEach((file) => {
	if (file.endsWith('.txt')) {
		const filePath = path.join(inputPath, file);
		const text = fs.readFileSync(filePath, 'utf8');
		const encrypted = CryptoJS.AES.encrypt(text, password).toString();
		fs.writeFileSync(path.join(outputPath, file), encrypted, 'utf8');
		console.log(`Encrypted: ${file}`);
	}
});
