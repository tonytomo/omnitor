import type { ToolInfo } from '$lib/types/info';
import { writable } from 'svelte/store';

const infos = writable<ToolInfo>({
	icon: 'ri-information-2-line',
	name: 'Information Board',
	definition: 'Click on a tool to see its information'
});

export default infos;

export function setInfo(info: ToolInfo) {
	infos.set(info);
}
