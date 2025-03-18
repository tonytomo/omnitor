import type { Toast } from '$lib/types/toast';
import { writable } from 'svelte/store';

const toast = writable(<Toast>{ id: '', message: '', type: 'success' });

export default toast;

export const showToast = (
	message: string,
	type: 'success' | 'error' | 'info',
	duration?: number
) => {
	const id = Math.random().toString(36).substring(2, 9);
	toast.set({ id, message, type, duration });
};
