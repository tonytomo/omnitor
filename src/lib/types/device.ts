export interface Device {
	connected: boolean;
	ble?: BluetoothDevice;
	servUUID: string;
	charUUID: string;
	usb?: any;
	bc?: any;
	port?: SerialPort;
	vendorId: number;
	productId: number;
	bluetoothId: number;
	baudRate: number;
}
