<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import InputErrorMessage from '$lib/components/InputErrorMessage.svelte';
	import Label from '$lib/components/Label.svelte';
	import InputProvider from '$lib/contexts/input-provider/InputProvider.svelte';
	import { formErrors } from '$lib/stores/form-errors';
	import AuthService from '$lib/services/auth/AuthService';
	import loginSchema from '$lib/utils/form-validations/schemas/login';
	import { Circle } from 'svelte-loading-spinners';
	import { validateFormData } from '$lib/utils/form-validations/validation';

	const authService = new AuthService();
	const homePagePath = '/';
	let isSubmitting = false;

	async function handleOnSubmit(e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		$formErrors = {};
		const formData = new FormData(e.currentTarget);
		const errors = await validateFormData(formData, loginSchema);

		if (errors) {
			$formErrors = errors;
			return;
		}

		try {
			isSubmitting = true;
			await authService.login(formData);
			window.location.href = homePagePath;
		} catch (e) {
			console.error(e);
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="flex flex-col items-center justify-center mt-32">
	<h1 class="text-3xl font-bold">Welcome</h1>

	<form class="flex flex-col w-11/12 max-w-[533px] mt-11 gap-3 items-center" on:submit|preventDefault={handleOnSubmit}>
		<div class="flex flex-col w-full">
			<InputProvider name="email" type="email">
				<Label>Email</Label>
				<Input />
				<InputErrorMessage />
			</InputProvider>
		</div>

		<div class="flex flex-col w-full">
			<InputProvider name="password" type="password">
				<Label>Password</Label>
				<Input />
				<InputErrorMessage />
			</InputProvider>
		</div>

		<Button className="mt-5 w-9/12 max-w-64 h-14">
			{#if isSubmitting}
				<Circle size="35" color="#FBEEFF" />
			{:else}
				<p class="font-medium text-lg">LOGIN</p>
			{/if}
		</Button>
	</form>
</div>
