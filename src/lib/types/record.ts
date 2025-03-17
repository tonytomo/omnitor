export enum Status {
	CONNECTED = 'Connected',
	CONNECTING = 'Connecting',
	DISCONNECTED = 'Disconnected'
}

export enum State {
	IDLE = 'Idle',
	RUNNING = 'Running',
	ERROR = 'Error'
}

export enum Mode {
	BLE = 'Bluetooth Low Energy',
	USB = 'Universal Serial Bus',
	BC = 'Bluetooth Classic'
}

export enum Process {
	RAW = 'Raw Data',
	MAVG = 'Moving Average',
	MMED = 'Moving Median',
	LREG = 'Linear Regression'
}

export interface Record {
	status: Status;
	state: State;
	mode: Mode;
	name: string;
	process: Process;
	rawData: number[];
	processedData: number[];
	unit: string;
	threshold: Threshold;
	setting: Setting;
}

export interface Threshold {
	upper: number;
	lower: number;
}

export interface Setting {
	window: number;
	intercept: number;
	slope: number;
	target: number;
}
