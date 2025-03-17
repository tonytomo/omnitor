<script lang="ts">
	import device from '$lib/stores/device-store';
	import record from '$lib/stores/record-store';
	import { Mode } from '$lib/types/record';
	import Button from '../atoms/button.svelte';

	function handleMode(mode: Mode) {
		$record.mode = mode;
	}
</script>

<section class="col-span-1 flex flex-col gap-2">
	<div class="flex flex-row gap-2">
		<Button
			ariaLabel="BLE Mode"
			color={$record.mode === Mode.BLE ? 'btn-blue' : 'btn-yellow'}
			onClick={() => handleMode(Mode.BLE)}
		>
			<i class="ri-bluetooth-connect-line"></i>
		</Button>
		<Button
			ariaLabel="USB Mode"
			color={$record.mode === Mode.USB ? 'btn-blue' : 'btn-yellow'}
			onClick={() => handleMode(Mode.USB)}
		>
			<i class="ri-usb-line"></i>
		</Button>
		<Button
			ariaLabel="BLE Mode"
			color={$record.mode === Mode.BC ? 'btn-blue' : 'btn-yellow'}
			onClick={() => handleMode(Mode.BC)}
		>
			<i class="ri-bluetooth-line"></i>
		</Button>
		<Button ariaLabel="Info" color="btn-base" onClick={() => console.log('Info')}>
			<i class="ri-information-line"></i>
		</Button>
	</div>
	<div class="container-block p-2 text-xs">
		<h4 class="text-sm">
			{#if $record.mode === Mode.BLE}
				Bluetooth Low Energy Mode
			{:else if $record.mode === Mode.USB}
				USB Mode
			{:else if $record.mode === Mode.BC}
				Bluetooth Classic Mode
			{:else}
				Unknown Mode
			{/if}
		</h4>
		<h4 class="text-slate-500">Device: {$device.connected ? $device.ble : 'None'}</h4>
	</div>
</section>
