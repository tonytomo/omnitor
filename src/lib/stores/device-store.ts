import type { Device } from '$lib/types/device';
import { writable } from 'svelte/store';

const device = writable(<Device>{
	connected: false,
	ble: undefined,
	servUUID: '',
	charUUID: '',
	usb: undefined,
	bc: undefined,
	port: 'Select',
	baudRate: 9600
});

export default device;
