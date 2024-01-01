<script lang="ts">
	export let title: string;
	export let text: string;
</script>

<div class="flex flex-col gap-2">
	<h3 class="text-xl text-primary-text font-bold">{title}</h3>
	<p class="text-base text-secondary-text font-semibold">{text}</p>
</div>
