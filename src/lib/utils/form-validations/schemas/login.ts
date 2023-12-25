import { z } from 'zod';
import { zfd } from 'zod-form-data';

const loginSchema = zfd.formData({
	email: zfd.text(z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' })),
	password: zfd.text(z.string({ required_error: 'Password is required' }))
});

export default loginSchema;
