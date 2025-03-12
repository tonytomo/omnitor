import { Process, State, type Record } from '$lib/types/record';
import { get, writable } from 'svelte/store';

const record = writable(<Record>{
	state: State.STOPPED,
	name: '',
	process: Process.RAW,
	rawData: [],
	processedData: [],
	unit: '',
	threshold: { upper: 0, lower: 0 },
	setting: { window: 0, intercept: 0, slope: 0 }
});

export default record;

export function getProcess() {
	return get(record).process;
}

export function addRawData(data: number) {
	record.update((store) => {
		store.rawData.push(data);
		return store;
	});
}

export function addProcessedData(data: number) {
	record.update((store) => {
		store.processedData.push(data);
		return store;
	});
}

export function getRawData() {
	return get(record).rawData;
}

export function getProcessedData() {
	return get(record).processedData;
}

export function getWindow() {
	return get(record).setting.window;
}

export function getIntercept() {
	return get(record).setting.intercept;
}

export function getSlope() {
	return get(record).setting.slope;
}

export function getUpperThreshold() {
	return get(record).threshold.upper;
}

export function getLowerThreshold() {
	return get(record).threshold.lower;
}

export function setState(state: State) {
	record.update((store) => {
		store.state = state;
		return store;
	});
}

export function setProcess(process: Process) {
	record.update((store) => {
		store.process = process;
		return store;
	});
}

export function resetRecord() {
	record.update((store) => {
		store.state = State.STOPPED;
		store.name = 'Temperature';
		store.process = Process.RAW;
		store.rawData = [];
		store.processedData = [];
		store.unit = '°C';
		store.threshold = { upper: 40, lower: 15 };
		store.setting = { window: 10, intercept: 0, slope: 1 };
		return store;
	});
}
