async function validateFormData(formData: FormData, schema: Zod.Schema) {
	const formValidation = await schema.safeParseAsync(formData);

	if (!formValidation.success) {
		return formValidation.error.flatten().fieldErrors;
	}

	return;
}

export { validateFormData };
