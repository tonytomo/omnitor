import type { Stats } from '$lib/types/stats';
import { writable } from 'svelte/store';
import record, { getTarget } from './record-store';

const stats = writable(<Stats>{
	total: 0,
	mean: 0,
	max: 0,
	min: 0,
	standardDeviation: 0,
	variance: 0,
	precision: 0,
	accuracy: 0
});

export default stats;

export function calculateStats(data: number[]) {
	stats.update(() => {
		const total = data.length;
		const mean = data.reduce((acc, val) => acc + val, 0) / total;
		const max = Math.max(...data);
		const min = Math.min(...data);
		const variance = data.reduce((acc, val) => acc + (val - mean) ** 2, 0) / total;
		const standardDeviation = Math.sqrt(variance);
		const precision = standardDeviation / mean;
		const target = getTarget();
		const accuracy = (1 - Math.abs(mean - target) / target) * 100;

		return {
			total,
			mean,
			max,
			min,
			standardDeviation,
			variance,
			precision,
			accuracy
		};
	});
}
