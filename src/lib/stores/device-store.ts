import type { Device } from '$lib/types/device';
import { get, writable } from 'svelte/store';

const device = writable(<Device>{
	connected: false,
	ble: undefined,
	bleServ: undefined,
	servUUID: '',
	charUUID: '',
	port: undefined,
	vendorId: 0,
	productId: 0,
	bluetoothId: 0,
	baudRate: 9600
});

export default device;

export function setConnected(connected: boolean) {
	device.update((store) => {
		store.connected = connected;
		return store;
	});
}

export function setPort(port: SerialPort | undefined) {
	device.update((store) => {
		store.port = port;
		return store;
	});
}

export function setBluetoothDevice(ble: BluetoothDevice | undefined) {
	device.update((store) => {
		store.ble = ble;
		return store;
	});
}

export function setBluetoothServer(server: BluetoothRemoteGATTServer | undefined) {
	device.update((store) => {
		store.bleServ = server;
		return store;
	});
}

export function setBleUUID(servUUID: string, charUUID: string) {
	device.update((store) => {
		store.servUUID = servUUID;
		store.charUUID = charUUID;
		return store;
	});
}

export function setUsbId(vendorId: number, productId: number) {
	device.update((store) => {
		store.vendorId = vendorId;
		store.productId = productId;
		return store;
	});
}

export function setBluetoothId(id: number) {
	device.update((store) => {
		store.bluetoothId = id;
		return store;
	});
}
