import {
	getIntercept,
	getLowerThreshold,
	getProcess,
	getProcessedData,
	getSlope,
	getUpperThreshold,
	getWindow,
	setProcess
} from '$lib/stores/record-store';
import { Process } from '$lib/types/record';

export function getRandomNumber() {
	const min = getLowerThreshold();
	const max = getUpperThreshold();

	return Math.floor(Math.random() * (max - min - 5)) + min + 5;
}

export function toPercent(value: number) {
	const min = getLowerThreshold();
	const max = getUpperThreshold();
	return Math.round(((value - min) / (max - min)) * 80 * 10) / 10;
}

export function calculateTrend() {
	const data = getProcessedData();

	if (data.length < 2) return 0;

	const lastValue = data[data.length - 1];
	const previousValue = data[data.length - 2];

	const trend = lastValue - previousValue;
	return trend;
}

export function processValue(value: number) {
	const process = getProcess();

	switch (process) {
		case Process.RAW:
			return value;
		case Process.MAVG:
			return calculateMovingAverage(value);
		case Process.MMED:
			return calculateMovingMedian(value);
		case Process.LREG:
			return calculateLinearRegression(value);
	}
}

export function calculateMovingAverage(value: number) {
	const data = getProcessedData();
	const window = getWindow();

	if (data.length < window) return value;

	const temp = data.slice(-window);
	const sum = temp.reduce((acc, value) => acc + value, 0) - temp[0] + value;
	const average = sum / window;

	return Math.round(average * 10) / 10;
}

export function calculateMovingMedian(value: number) {
	const data = getProcessedData();
	const window = getWindow();

	if (data.length < window) return value;

	const temp = [...data.slice(-window), value];
	const sortedData = temp.sort((a, b) => a - b);
	const uniqueData = [...new Set(sortedData)];
	const medianIndex = Math.floor(uniqueData.length / 2);
	const median =
		uniqueData.length % 2 === 0
			? (uniqueData[medianIndex] + uniqueData[medianIndex - 1]) / 2
			: uniqueData[medianIndex];

	return Math.round(median * 10) / 10;
}

export function calculateLinearRegression(value: number) {
	const intercept = getIntercept();
	const slope = getSlope();

	const prediction = intercept + slope * value;

	return Math.round(prediction * 10) / 10;
}
