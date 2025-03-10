export enum State {
	STOPPED,
	RUNNING,
	ERROR
}

export interface Record {
	state: State;
	name: string;
	data: number[];
	dataInPercent: number[];
	unit: string;
	threshold: Threshold;
}

export interface Threshold {
	upper: number;
	lower: number;
}
