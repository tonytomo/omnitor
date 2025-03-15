async function searchBluetoothDevices() {
	try {
		const device = await navigator.bluetooth.requestDevice({
			acceptAllDevices: true, // Show all nearby devices
			optionalServices: ['battery_service'] // Specify required GATT services
		});
		console.log('Selected device:', device.name);
		return device;
	} catch (error) {
		console.error('Error searching for devices:', error);
	}
}

async function connectToDevice(device: BluetoothDevice) {
	try {
		const server = await device.gatt?.connect();
		console.log('Connected to GATT server:', server);
		return server;
	} catch (error) {
		console.error('Error connecting to device:', error);
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
		console.log('Data sent:', data);
	} catch (error) {
		console.error('Error sending data:', error);
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

		// Enable notifications
		await characteristic.startNotifications();
		console.log('Notifications started');

		// Listen for new data
		characteristic.addEventListener('characteristicvaluechanged', (event: Event) => {
			const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
			if (value) {
				const data = new TextDecoder().decode(value.buffer);
				console.log('Received data:', data);
				// Process the received data here
			}
		});
	} catch (error) {
		console.error('Error setting up notifications:', error);
	}
}

async function stopListening(characteristic: BluetoothRemoteGATTCharacteristic) {
	try {
		await characteristic.stopNotifications();
		console.log('Notifications IDLE');
		characteristic.removeEventListener('characteristicvaluechanged', (event: Event) => {
			console.log('Listener removed');
		});
	} catch (error) {
		console.error('Error stopping notifications:', error);
	}
}

export { searchBluetoothDevices, connectToDevice, sendData, listenToData, stopListening };
