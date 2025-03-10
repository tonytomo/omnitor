import { State, type Record } from '$lib/types/record';
import { writable } from 'svelte/store';

const record = writable(<Record>{
	state: State.STOPPED,
	name: '',
	data: [],
	dataInPercent: [],
	unit: '',
	threshold: { upper: 0, lower: 0 }
});

export default record;

export function resetRecord() {
	record.update((store) => {
		store.state = State.STOPPED;
		store.name = '';
		store.data = [];
		store.dataInPercent = [];
		store.unit = '';
		store.threshold = { upper: 0, lower: 0 };
		return store;
	});
}
