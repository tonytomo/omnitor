import type { Log } from '$lib/types/log';
import { writable } from 'svelte/store';

const logs = writable(<Log[]>[]);

export default logs;

export function addLog(message: string) {
	if (!message) return;

	logs.update((store) => {
		store.push({
			datetime: new Date().toISOString(),
			message
		});
		return store;
	});
}

export function clearLog() {
	logs.update((store) => {
		store = [];
		return store;
	});
}
