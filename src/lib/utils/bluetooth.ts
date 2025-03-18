import { addLog } from '$lib/stores/log-store';
import { showToast } from '$lib/stores/toast-store';

async function searchBluetoothDevices() {
	try {
		const device = await navigator.bluetooth.requestDevice({
			acceptAllDevices: true,
			optionalServices: ['battery_service']
		});

		showToast('Bluetooth device found', 'success');

		return device;
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

		showToast('Connected to server', 'success');
		return server;
	} catch (error) {
		showToast('Error connecting to device', 'error');
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

export { searchBluetoothDevices, connectToDevice, sendData, listenToData, stopListening };
