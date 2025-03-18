import device, { setBluetoothDevice, setBluetoothServer, setConnected } from '$lib/stores/device-store';
import { addLog } from '$lib/stores/log-store';
import { setStatus } from '$lib/stores/record-store';
import { showToast } from '$lib/stores/toast-store';
import { Status } from '$lib/types/record';
import { get } from 'svelte/store';

async function searchBluetoothDevices() {
	try {
		const device = await navigator.bluetooth.requestDevice({
			acceptAllDevices: true,
			optionalServices: ['battery_service']
		});

		if (!device) {
			showToast('No Bluetooth device found', 'error');
			return;
		}

		setBluetoothDevice(device);
		showToast('Bluetooth device found', 'success');

		await connectToDevice(device);
	} catch (error) {
		showToast('Error searching for devices', 'error');
		console.error(error);
	}
}

async function connectToDevice(device: BluetoothDevice) {
	try {
		const server = await device.gatt?.connect();

		if (!server) {
			showToast('Error connecting to server', 'error');
			return;
		}

		setStatus(Status.CONNECTED);
		setConnected(true);
		setBluetoothServer(server);

		showToast('Connected to server', 'success');
	} catch (error) {
		showToast('Error connecting to device', 'error');
		console.error(error);
	}
}

async function disconnectFromDevice() {
	try {
		const server = get(device).bleServ;

		if (!server) {
			showToast('No server found', 'error');
			return;
		}

		setStatus(Status.DISCONNECTED);
		setConnected(false);
		setBluetoothServer(undefined);

		server.disconnect();
		showToast('Disconnected from server', 'success');
	} catch (error) {
		showToast('Error disconnecting from server', 'error');
		console.error(error);
	}
}

async function sendData(
	server: BluetoothRemoteGATTServer,
	serviceUUID: string,
	characteristicUUID: string,
	data: Uint8Array
) {
	try {
		const service = await server.getPrimaryService(serviceUUID);
		const characteristic = await service.getCharacteristic(characteristicUUID);
		await characteristic.writeValue(data);

		showToast('Data sent', 'success');
	} catch (error) {
		showToast('Error sending data', 'error');
		console.error(error);
	}
}

async function listenToData(
	server: BluetoothRemoteGATTServer,
	serviceUUID: string,
	characteristicUUID: string
) {
	try {
		const service = await server.getPrimaryService(serviceUUID);
		const characteristic = await service.getCharacteristic(characteristicUUID);

		await characteristic.startNotifications();
		showToast('Listening to data', 'info');

		characteristic.addEventListener('characteristicvaluechanged', (event: Event) => {
			const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
			if (value) {
				const data = new TextDecoder().decode(value.buffer);
				addLog(data);
				// Process the received data here
			}
		});
	} catch (error) {
		showToast('Error setting up notifications', 'error');
		console.error(error);
	}
}

async function stopListening(characteristic: BluetoothRemoteGATTCharacteristic) {
	try {
		await characteristic.stopNotifications();
		showToast('Stopped listening to data', 'info');
		characteristic.removeEventListener('characteristicvaluechanged', (event: Event) => {
			showToast('Listener removed', 'info');
		});
	} catch (error) {
		showToast('Error stopping notifications', 'error');
		console.error(error);
	}
}

export {
	searchBluetoothDevices,
	connectToDevice,
	disconnectFromDevice,
	sendData,
	listenToData,
	stopListening
};
