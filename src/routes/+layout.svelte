<script>
	import '../app.css';
	import { page } from '$app/stores';
	import AuthService from '$lib/services/auth/AuthService';
	import Button from '$lib/components/Button.svelte';
	import MenuIcon from '$lib/icons/MenuIcon.svelte';
	import Arrow2Icon from '$lib/icons/Arrow2Icon.svelte';

	$: backPath = $page.data.backPath;
	$: user = $page.data.user;
	$: url = $page.url;

	const loginPagePath = '/login';
	const homePagePath = '/';

	let isMenuVisible = false;

	async function handleLogout() {
		const token = $page.data.token;
		const authService = new AuthService(fetch, token);
		const response = await authService.logout();

		if (response.ok) {
			window.location.href = loginPagePath;
		}
	}

	function toggleMenu() {
		isMenuVisible = !isMenuVisible;
	}

	$: if (url.searchParams.has('redirect')) {
		user = undefined;
	}
</script>

{#if user}
	<div class={`flex flex-col items-end ${isMenuVisible && 'bg-secondary'}`}>
		<div class="sm:hidden flex flex-row justify-between w-full items-center px-4 mt-4">
			<div>
				{#if $page.url.pathname !== homePagePath}
					<a href={backPath} class="h-6 flex flex-row font-medium text-secondary-text">
						<Arrow2Icon />
						Back
					</a>
				{/if}
			</div>
			<button on:click={toggleMenu}>
				<MenuIcon />
			</button>
		</div>
		<header
			class={`${
				isMenuVisible ? 'flex' : 'hidden'
			} flex-col w-full gap-2 items-start justify-between px-5 py-2 h-auto bg-secondary sm:h-24 sm:flex sm:gap-5 sm:flex-row sm:items-center`}
		>
			<div class="hidden sm:block">
				{#if $page.url.pathname !== homePagePath}
					<a href={backPath} class="h-6 flex flex-row font-medium text-secondary-text">
						<Arrow2Icon />
						Back
					</a>
				{/if}
			</div>

			<div class="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
				<p class="font-semibold text-lg text-secondary-text">{`Welcome ${user.name}!`}</p>
				<Button on:click={handleLogout} class="w-24 h-10 py-2 text-sm font-semibold" data-cy="logout-button">
					LOGOUT
				</Button>
			</div>
		</header>
	</div>
{/if}

<slot />
