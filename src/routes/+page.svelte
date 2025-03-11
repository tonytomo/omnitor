<script lang="ts">
	import Graph from '$lib/components/graph.svelte';
	import Log from '$lib/components/log.svelte';
	import record from '$lib/stores/record-store';
	import { onMount } from 'svelte';

	onMount(() => {
		$record.threshold = { upper: 40, lower: 15 };
		$record.name = 'Temperature';
		$record.unit = '°C';
	});
</script>

<main class="container-grid gap-2 px-4 py-10">
	<Graph />
	<Log />
</main>
