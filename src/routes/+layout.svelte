<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import 'remixicon/fonts/remixicon.css';
	let { children } = $props();

	let isLoading = $state(true);

	onMount(() => {
		isLoading = false;
	});
</script>

{#if isLoading}
	<div class="container-center">
		<i class="ri-loader-2-line animate-spin text-6xl"></i>
	</div>
{:else}
	{@render children()}
{/if}
