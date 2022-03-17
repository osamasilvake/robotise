/**
 * convert file to base64
 * @param file
 * @returns
 */
export const fileConvertBase64 = (file: File) => {
	return new Promise((resolve, reject) => {
		if (!file) reject();

		// file reader
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onload = () => resolve(fileReader.result);
		fileReader.onerror = (error) => reject(error);
	});
};
