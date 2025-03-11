export enum State {
	STOPPED,
	RUNNING,
	ERROR
}

export enum Process {
	RAW = 'Raw Data',
	MAVG = 'Moving Average',
	MMED = 'Moving Median',
	LREG = 'Linear Regression'
}

export interface Record {
	state: State;
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
}
