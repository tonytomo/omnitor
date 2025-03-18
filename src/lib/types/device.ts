export interface Device {
	connected: boolean;
	ble?: BluetoothDevice;
	bleServ?: BluetoothRemoteGATTServer;
	servUUID: string;
	charUUID: string;
	port?: SerialPort;
	vendorId: number;
	productId: number;
	bluetoothId: number;
	baudRate: number;
}
