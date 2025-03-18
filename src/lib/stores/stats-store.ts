import type { Stats } from '$lib/types/stats';
import { writable } from 'svelte/store';
import record, { getProcessedData, getTarget } from './record-store';
import { round } from '$lib/utils/number';

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

export function calculateStats() {
	const data = getProcessedData();

	stats.update(() => {
		const total = round(data.length);
		const mean = round(data.reduce((acc, val) => acc + val, 0) / total);
		const max = round(Math.max(...data));
		const min = round(Math.min(...data));
		const variance = round(data.reduce((acc, val) => acc + (val - mean) ** 2, 0) / total);
		const standardDeviation = round(Math.sqrt(variance));
		const precision = round(standardDeviation / mean);
		const target = round(getTarget());
		const accuracy = round((1 - Math.abs(mean - target) / target) * 100);

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
