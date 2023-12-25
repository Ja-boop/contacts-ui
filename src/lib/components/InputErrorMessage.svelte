<script lang="ts">
	import { getInputContext } from '$lib/contexts/input-provider/context';

	const input = getInputContext();
</script>

<p class="h-6 text-red-600 font-semibold">{$input.error || ''}</p>
