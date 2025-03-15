<script lang="ts">
	import Button from '$lib/components/atoms/button.svelte';
	import SInput from '$lib/components/atoms/s-input.svelte';
	import Graph from '$lib/components/blocks/graph.svelte';
	import Log from '$lib/components/blocks/log.svelte';
	import Processor from '$lib/components/blocks/processor.svelte';
	import Setting from '$lib/components/blocks/setting.svelte';
	import record from '$lib/stores/record-store';
	import stats from '$lib/stores/stats-store';
	import { Process, State, Status } from '$lib/types/record';
	import { connectToDevice, searchBluetoothDevices } from '$lib/utils/bluetooth';
	import { onMount } from 'svelte';

	onMount(() => {
		$record.threshold = { upper: 40, lower: 15 };
		$record.name = 'Temperature';
		$record.unit = '°C';
		$record.process = Process.RAW;
		$record.setting = { window: 10, intercept: 0, slope: 1, target: 20 };
	});

	let displayInfo = 'flex';
	let connectedDevice: BluetoothDevice | undefined;
	let server: BluetoothRemoteGATTServer | undefined;

	function toggleInfo() {
		displayInfo = displayInfo === 'hidden' ? 'flex' : 'hidden';
	}

	async function handleConnect() {
		if ($record.status === Status.CONNECTED) {
			$record.status = Status.DISCONNECTED;
		} else {
			$record.status = Status.CONNECTING;

			connectedDevice = await searchBluetoothDevices();
			if (!connectedDevice) {
				$record.status = Status.DISCONNECTED;
				return;
			}

			server = await connectToDevice(connectedDevice);
			if (!server) {
				$record.status = Status.DISCONNECTED;
				return;
			}

			$record.status = Status.CONNECTED;
		}
	}
</script>

<main class="container-grid gap-2 px-4 py-10">
	<section class="form-container">
		<div class="flex flex-col justify-start gap-2 border border-slate-900 p-4">
			<h4 class="text-sm">Connect to a BLE device</h4>
			<h4 class="text-xs text-slate-500">
				<i class="ri-information-2-line"></i>
				Bluetooth Low Energy
			</h4>
			<Button
				disabled={$record.status === Status.CONNECTING}
				ariaLabel="Connect"
				color={$record.status === Status.CONNECTED ? 'btn-red' : 'btn-blue'}
				onClick={handleConnect}
			>
				{#if $record.status === Status.DISCONNECTED}
					<i class="ri-bluetooth-line"></i>
				{:else if $record.status === Status.CONNECTING}
					<p>Waiting..</p>
				{:else}
					<i class="ri-shut-down-line"></i>
				{/if}
			</Button>
			<h4 class="text-xs">Status: {$record.status}</h4>
		</div>

		<div class="flex flex-col gap-2 border border-slate-900 p-4 text-xs">
			<h4>Connected device: {connectedDevice ? connectedDevice.name : 'None'}</h4>
			<h4>Services: {server ? (server.connected ? 'Connected' : 'Disconnected') : 'None'}</h4>
			<h4>Date: {new Date().toLocaleDateString()}</h4>
		</div>

		<div
			class="relative flex flex-col gap-2 border border-slate-900 p-4 sm:col-span-2 xl:col-span-3"
		>
			<h4 class="text-base font-semibold">
				<i class="ri-information-2-line"></i>
				{$record.name} ({$record.unit})
			</h4>
			<Button ariaLabel="Toggle info" color="btn-base absolute top-2 right-2" onClick={toggleInfo}>
				<i class="ri-arrow-down-s-line"></i>
			</Button>
			<div class="{displayInfo} max-h-28 flex-col flex-wrap gap-1 text-xs md:max-h-20">
				<p>Total data: {$stats.total}</p>
				<p>Mean: {$stats.mean}</p>
				<p>Max: {$stats.max}</p>
				<p>Min: {$stats.min}</p>
				<p>Variance: {$stats.variance}</p>
				<p>Precision: {$stats.precision}</p>
				<p>Accuracy: {$stats.accuracy}</p>
			</div>
		</div>
	</section>

	<Graph />
	<Log />
	<Setting />
	<Processor />
</main>
