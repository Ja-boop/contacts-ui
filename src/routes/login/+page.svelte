<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import InputErrorMessage from '$lib/components/InputErrorMessage.svelte';
	import Label from '$lib/components/Label.svelte';
	import InputProvider from '$lib/contexts/input-provider/InputProvider.svelte';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { onMount } from 'svelte';
	import { formErrors } from '$lib/stores';
	import { Circle } from 'svelte-loading-spinners';

	export let form: ActionData;
	let isLoading = false;

	$: if (form?.errors) {
		isLoading = false;
		$formErrors = form?.errors;
	}

	onMount(() => {
		$formErrors = {};
	});
</script>

<div class="flex flex-col items-center justify-center mt-32">
	<h1 class="text-3xl font-bold">Welcome</h1>

	<form
		method="POST"
		use:enhance={() => {
			isLoading = true;
		}}
		class="flex flex-col w-11/12 max-w-[533px] mt-11 gap-3 items-center"
	>
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

		<Button class="mt-5 w-9/12 max-w-64 h-14" data-cy="login-button">
			{#if isLoading}
				<Circle size="35" color="var(--tertiary)" />
			{:else}
				LOGIN
			{/if}
		</Button>
	</form>
</div>
