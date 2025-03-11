import { getLowerThreshold, getUpperThreshold, setProcess } from '$lib/stores/record-store';
import { Process } from '$lib/types/record';

export function toPercent(value: number) {
	const min = getLowerThreshold();
	const max = getUpperThreshold();
	return Math.round(((value - min) / (max - min)) * 80 * 10) / 10;
}

export function calculateTrend(data: number[]) {
	if (data.length < 2) return 0;

	const lastValue = data[data.length - 1];
	const previousValue = data[data.length - 2];

	const trend = lastValue - previousValue;
	return trend;
}

export function calculateMovingAverage(data: number[], blockSize: number, value: number) {
	setProcess(Process.MAVG);

	if (data.length < blockSize) return value;

	const temp = data.slice(-blockSize);
	const sum = temp.reduce((acc, value) => acc + value, 0) - temp[0] + value;
	const average = sum / blockSize;

	return Math.round(average * 10) / 10;
}

export function calculateMovingMedian(data: number[], blockSize: number, value: number) {
	setProcess(Process.MMED);

	if (data.length < blockSize) return value;

	const temp = [...data.slice(-blockSize), value];
	const sortedData = temp.sort((a, b) => a - b);
	const uniqueData = [...new Set(sortedData)];
	const medianIndex = Math.floor(uniqueData.length / 2);
	const median =
		uniqueData.length % 2 === 0
			? (uniqueData[medianIndex] + uniqueData[medianIndex - 1]) / 2
			: uniqueData[medianIndex];

	return Math.round(median * 10) / 10;
}

export function calculateLinearRegression(intercept: number, slope: number, value: number) {
	setProcess(Process.LREG);

	const prediction = intercept + slope * value;

	return Math.round(prediction * 10) / 10;
}
