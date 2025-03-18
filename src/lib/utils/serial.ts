import device, { setBluetoothId, setPort, setUsbId } from '$lib/stores/device-store';
import { addLog } from '$lib/stores/log-store';
import { showToast } from '$lib/stores/toast-store';
import { get } from 'svelte/store';

export async function connectToSerialDevice() {
	const baudRate = get(device).baudRate;

	try {
		const port = await navigator.serial.requestPort();

		if (!port) {
			addLog('No serial port found');
			return false;
		}

		setPort(port);

		const portInfo = port.getInfo();
		if (portInfo.usbProductId && portInfo.usbVendorId)
			setUsbId(portInfo.usbVendorId, portInfo.usbProductId);

		if ((portInfo as any).bluetoothServiceClassId)
			setBluetoothId((portInfo as any).bluetoothServiceClassId);

		await port.open({ baudRate });

		showToast('Connected to serial device', 'success');
	} catch (error) {
		showToast('Error connecting to serial device', 'error');
		console.error(error);
	}
}

export async function listenToData() {
	try {
		const port = await navigator.serial.requestPort();
		const reader = port.readable?.getReader();

		if (!reader) {
			addLog('No reader found');
			return;
		}

		while (true) {
			const { value, done } = await reader.read();

			if (done) {
				showToast('No more data to read', 'info');
				reader.releaseLock();
				break;
			}

			addLog(value);
		}
	} catch (error) {
		showToast('Error listening to data', 'error');
		console.error(error);
	}
}

export async function sendData(data: Uint8Array) {
	try {
		const port = await navigator.serial.requestPort();
		const writer = port.writable?.getWriter();
		if (writer) {
			try {
				await writer.write(data);
				addLog(new TextDecoder().decode(data));
			} catch (error) {
				console.error('Error sending data:', error);
			} finally {
				writer.releaseLock();
			}
		} else {
			showToast('Writable stream is not available', 'error');
			console.error('Writable stream is not available');
		}
	} catch (error) {
		showToast('Error sending data', 'error');
		console.error(error);
	}
}
