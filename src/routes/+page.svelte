<script lang="ts">
	import { onMount } from 'svelte';
	import Toast from '$lib/components/atoms/toast.svelte';
	import Connect from '$lib/components/blocks/connect.svelte';
	import Device from '$lib/components/blocks/device.svelte';
	import Graph from '$lib/components/blocks/graph.svelte';
	import Log from '$lib/components/blocks/log.svelte';
	import Processor from '$lib/components/blocks/processor.svelte';
	import Setting from '$lib/components/blocks/setting.svelte';
	import Stats from '$lib/components/blocks/stats.svelte';
	import record from '$lib/stores/record-store';
	import { Process } from '$lib/types/record';

	onMount(() => {
		$record.threshold = { upper: 40, lower: 15 };
		$record.name = 'Temperature';
		$record.unit = '°C';
		$record.process = Process.RAW;
		$record.setting = { window: 10, intercept: 0, slope: 1, target: 20 };
	});
</script>

<main class="container-grid gap-2 px-4 py-10">
	<div class="col-span-1 flex flex-col gap-2">
		<Connect />
		<Device />
		<Stats />
		<Log />
	</div>
	<div class="col-span-1 flex flex-col gap-2 md:col-span-2">
		<Graph />
		<div class="flex flex-row gap-2">
			<Setting />
			<Processor />
		</div>
	</div>
</main>

<Toast />
