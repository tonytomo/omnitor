<script lang="ts">
	import Graph from '$lib/components/graph.svelte';
	import Log from '$lib/components/log.svelte';
	import Processor from '$lib/components/processor.svelte';
	import Setting from '$lib/components/setting.svelte';
	import record from '$lib/stores/record-store';
	import { Process, State } from '$lib/types/record';
	import { onMount } from 'svelte';

	onMount(() => {
		$record.threshold = { upper: 40, lower: 15 };
		$record.name = 'Temperature';
		$record.unit = '°C';
		$record.process = Process.RAW;
		$record.setting = { window: 10, intercept: 0, slope: 1 };
	});
</script>

<main class="container-grid gap-2 px-4 py-10">
	<Setting />
	<Processor />
	<Graph />
	<Log />

	<section class="form-container">
		<div class="border border-slate-900 p-2">
			<i class="ri-information-2-line"></i>
		</div>
		<div class="border border-slate-900 p-2">
			<i class="ri-information-2-line"></i>
		</div>
		<div class="border border-slate-900 p-2">
			<i class="ri-information-2-line"></i>
		</div>
		<div class="border border-slate-900 p-2">
			<i class="ri-information-2-line"></i>
		</div>
	</section>
</main>
