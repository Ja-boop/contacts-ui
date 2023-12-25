<script>
	import '../app.css';
	import { page } from '$app/stores';
	import AuthService from '$lib/services/auth/AuthService';
	import Button from '$lib/components/Button.svelte';
	import MenuIcon from '$lib/icons/MenuIcon.svelte';

	const loginPagePath = '/login';
	const authService = new AuthService();
	const user = $page.data.user;
	let isMenuVisible = false;

	async function handleLogout() {
		const response = await authService.logout();

		if (response.status === 200) {
			window.location.href = loginPagePath;
		}
	}

	function toggleMenu() {
		isMenuVisible = !isMenuVisible;
	}
</script>

{#if user}
	<div class={`flex flex-col items-end ${isMenuVisible && 'bg-[#FBEEFF]'}`}>
		<button on:click={toggleMenu} class="sm:hidden">
			<MenuIcon />
		</button>
		<header
			class={`${
				isMenuVisible ? 'flex' : 'hidden'
			} flex-col w-full gap-2 items-start justify-end px-5 py-2 h-auto bg-[#FBEEFF] sm:h-24 sm:flex sm:gap-5 sm:flex-row sm:items-center`}
		>
			<p class="font-semibold text-lg text-[#9378FF]">{`Welcome ${user.name}!`}</p>
			<Button on:click={handleLogout} className="w-24 h-10 py-2 text-sm font-semibold">LOGOUT</Button>
		</header>
	</div>
{/if}

<slot />
