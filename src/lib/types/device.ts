export interface Device {
	connected: boolean;
	ble?: BluetoothDevice;
	servUUID: string;
	charUUID: string;
	usb?: any;
	bc?: any;
	port: string;
	baudRate: number;
}
