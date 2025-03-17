import type { Server } from '$lib/types/server';
import { writable } from 'svelte/store';

const server = writable(<Server>{
	connected: false,
    gatt: undefined
});

export default server;
