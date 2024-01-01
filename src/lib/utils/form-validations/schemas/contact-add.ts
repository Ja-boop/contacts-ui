import { z } from 'zod';
import { zfd } from 'zod-form-data';

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const addContactSchema = zfd.formData({
	name: zfd.text(z.string({ required_error: 'Name is required' })),
	title: zfd.text(z.string({ required_error: 'Title is required' })),
	image: zfd.file(
		z
			.instanceof(File, { message: 'File is required' })
			.refine((file) => file.name.match(/\.(jpg|jpeg|png)$/i), { message: 'Invalid file type' })
			.refine((file) => file.size <= MAX_FILE_SIZE, { message: 'File size must be less than 2MB' })
	),
	address: zfd.text(z.string({ required_error: 'Address is required' })),
	phone: zfd.text(z.string({ required_error: 'Phone is required' })),
	email: zfd.text(z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }))
});

export default addContactSchema;
