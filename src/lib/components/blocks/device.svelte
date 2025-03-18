<script lang="ts">
	import device from '$lib/stores/device-store';
	import record from '$lib/stores/record-store';
	import { showToast } from '$lib/stores/toast-store';
	import { Mode, Status } from '$lib/types/record';
	import { disconnectFromDevice, searchBluetoothDevices } from '$lib/utils/bluetooth';
	import { connectToSerialDevice, disconnectFromSerialDevice } from '$lib/utils/serial';
	import Button from '../atoms/button.svelte';
	import SInput from '../atoms/s-input.svelte';

	function generateUUID() {
		const serverUuid = 'xxxxxxxx-0000-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			const r = (Math.random() * 16) | 0;
			const v = c === 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});

		const charUuid = serverUuid.slice(0, 12) + '1' + serverUuid.slice(13);

		const uuid = `const char *serviceUuid = "${serverUuid}";\nconst char *charUuid = "${charUuid}";`;

		navigator.clipboard.writeText(uuid);

		showToast('UUID generated. Copy it to your code.', 'info');
	}

	async function handleConnect() {
		console.log($device.connected);
		if ($record.mode === Mode.BLE) {
			if ($device.connected) await disconnectFromDevice();
			else await searchBluetoothDevices();
			return;
		}
		if ($record.mode === Mode.USBBC) {
			if ($device.connected) await disconnectFromSerialDevice();
			else await connectToSerialDevice();
			return;
		}
	}
</script>

<section class="col-span-1 flex flex-col gap-2">
	<div class="grid grid-cols-2 gap-2">
		<Button
			disabled={$record.status === Status.CONNECTING}
			ariaLabel="Connect"
			color={$record.status === Status.CONNECTED ? 'btn-red' : 'btn-teal'}
			onClick={handleConnect}
		>
			{#if $record.status === Status.DISCONNECTED}
				<i class="ri-links-line"></i>
			{:else if $record.status === Status.CONNECTING}
				<p>Waiting..</p>
			{:else}
				<i class="ri-shut-down-line"></i>
			{/if}
		</Button>
		{#if $record.mode === Mode.BLE}
			<Button
				ariaLabel="Generate UUID"
				color="btn-purple"
				onClick={generateUUID}
				info="Generate UUID"
			>
				<i class="ri-server-line"></i>
			</Button>
		{/if}

		{#if $record.mode === Mode.USBBC}
			<SInput bind:value={$device.baudRate}>
				<i class="ri-speed-line"></i>
			</SInput>
		{/if}
	</div>
</section>
