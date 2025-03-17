export interface Server {
    connected: boolean;
    gatt: BluetoothRemoteGATTServer | undefined;
}