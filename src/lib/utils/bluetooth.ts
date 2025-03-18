import device, {
	setBleUUID,
	setBluetoothDevice,
	setBluetoothServer,
	setConnected
} from '$lib/stores/device-store';
import { addLog } from '$lib/stores/log-store';
import { setStatus } from '$lib/stores/record-store';
import { showToast } from '$lib/stores/toast-store';
import { Status } from '$lib/types/record';
import { get } from 'svelte/store';

async function generateUUID() {
	const serverUuid = 'xxxxxxxx-0000-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0;
		const v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
	const charUuid = serverUuid.slice(0, 12) + '1' + serverUuid.slice(13);

	setBleUUID(serverUuid, charUuid);
	const uuid = `const char *serviceUuid = "${serverUuid}";\nconst char *charUuid = "${charUuid}";`;
	navigator.clipboard.writeText(uuid);

	showToast('UUID generated. Copy it to your code.', 'info');
}

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
		const service = await device.gatt?.connect();

		if (!service) {
			showToast('Error connecting to service', 'error');
			return;
		}

		setStatus(Status.CONNECTED);
		setConnected(true);
		setBluetoothServer(service);

		showToast('Connected to service', 'success');
	} catch (error) {
		showToast('Error connecting to service', 'error');
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
	generateUUID,
	searchBluetoothDevices,
	connectToDevice,
	disconnectFromDevice,
	sendData,
	listenToData,
	stopListening
};
