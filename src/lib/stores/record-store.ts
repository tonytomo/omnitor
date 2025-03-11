import { Process, State, type Record } from '$lib/types/record';
import { get, writable } from 'svelte/store';

const record = writable(<Record>{
	state: State.STOPPED,
	name: '',
	process: Process.RAW,
	rawData: [],
	processedData: [],
	unit: '',
	threshold: { upper: 0, lower: 0 }
});

export default record;

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
		store.name = '';
		store.process = Process.RAW;
		store.rawData = [];
		store.processedData = [];
		store.unit = '';
		store.threshold = { upper: 0, lower: 0 };
		return store;
	});
}
