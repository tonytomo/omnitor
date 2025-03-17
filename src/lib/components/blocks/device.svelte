<script lang="ts">
	import device from '$lib/stores/device-store';
	import record from '$lib/stores/record-store';
	import { Mode, Status } from '$lib/types/record';
	import { searchBluetoothDevices, connectToDevice } from '$lib/utils/bluetooth';
	import { connectToSerialDevice } from '$lib/utils/serial';
	import Button from '../atoms/button.svelte';
	import SInput from '../atoms/s-input.svelte';
	import SSelect from '../atoms/s-select.svelte';

	const PORT_OPTIONS = [
		{ label: 'COM1', value: 'COM1' },
		{ label: 'COM2', value: 'COM2' },
		{ label: 'COM3', value: 'COM3' },
		{ label: 'COM4', value: 'COM4' }
	];

	function generateServiceUUID() {
		const uuid = 'xxxxxxxx-0000-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			const r = (Math.random() * 16) | 0;
			const v = c === 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});

		console.log("const char *SERVER_UUID = '" + uuid + "';");
	}
	function generateCharUUID() {
		const uuid = 'xxxxxxxx-0xxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			const r = (Math.random() * 16) | 0;
			const v = c === 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});

		console.log("const char *CHAR_UUID = '" + uuid + "';");
	}

	async function handleConnect() {
		if ($record.status === Status.CONNECTED) {
			$record.status = Status.DISCONNECTED;
			return;
		}

		$record.status = Status.CONNECTING;

		if ($record.mode === Mode.BLE) {
			const bleDevice = await searchBluetoothDevices();
			if (bleDevice) {
				$device.ble = bleDevice;
				$device.connected = true;
				$record.status = Status.CONNECTED;
			} else {
				$record.status = Status.DISCONNECTED;
			}
		} else {
			const connected = await connectToSerialDevice();
			if (connected) {
				$device.connected = true;
				$record.status = Status.CONNECTED;
			} else {
				$record.status = Status.DISCONNECTED;
			}
		}
	}
</script>

<section class="col-span-1 flex flex-col gap-2">
	<div class="grid grid-cols-3 gap-2">
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
				onClick={generateServiceUUID}
				info="Generate UUID Service"
			>
				<i class="ri-server-line"></i>
			</Button>
			<Button
				ariaLabel="Generate UUID"
				color="btn-purple"
				onClick={generateCharUUID}
				info="Generate UUID Characteristic"
			>
				<i class="ri-instance-line"></i>
			</Button>
		{/if}

		{#if $record.mode === Mode.USB}
			<SSelect bind:value={$device.port} options={PORT_OPTIONS}>
				<i class="ri-usb-fill"></i>
			</SSelect>
			<SInput bind:value={$device.baudRate}>
				<i class="ri-speed-line"></i>
			</SInput>
		{/if}

		{#if $record.mode === Mode.BC}
			<SSelect bind:value={$device.port} options={PORT_OPTIONS}>
				<i class="ri-bluetooth-fill"></i>
			</SSelect>
			<SInput bind:value={$device.baudRate}>
				<i class="ri-speed-line"></i>
			</SInput>
		{/if}
	</div>
</section>
