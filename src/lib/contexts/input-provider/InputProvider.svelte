<script lang="ts">
	import { formErrors } from '$lib/stores';
	import { getInputContext, setInputContext } from './context';

	export let name: string;
	export let type = 'text';

	setInputContext();
	const input = getInputContext();

	$input.name = name;
	$input.type = type;

	$: if ($formErrors) {
		$input.error = $formErrors[name]?.[0];
	}
</script>

<slot />
