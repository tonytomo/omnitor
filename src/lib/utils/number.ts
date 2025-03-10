export function toPercent(value: number, max: number, min: number) {
	return Math.round(((value - min) / (max - min)) * 80 * 10) / 10;
}

export function calculateTrend(data: number[]) {
	if (data.length < 2) return 0;

	const lastValue = data[data.length - 1];
	const previousValue = data[data.length - 2];

	const trend = lastValue - previousValue;
	return trend;
}

export function calculateMovingAverage(data: number[], blockSize: number, newDatapoint: number) {
	if (data.length < blockSize) return newDatapoint;

	const temp = data.slice(-blockSize);
	const sum = temp.reduce((acc, value) => acc + value, 0) - temp[0] + newDatapoint;
	const average = sum / blockSize;

	return Math.round(average * 10) / 10;
}

export function calculateMovingMedian(data: number[], blockSize: number, newDatapoint: number) {
	if (data.length < blockSize) return newDatapoint;

	const temp = [...data.slice(-blockSize), newDatapoint];
	const sortedData = temp.sort((a, b) => a - b);

	const uniqueData = [...new Set(sortedData)];

	const medianIndex = Math.floor(uniqueData.length / 2);
	const median =
		uniqueData.length % 2 === 0
			? (uniqueData[medianIndex] + uniqueData[medianIndex - 1]) / 2
			: uniqueData[medianIndex];

	return Math.round(median * 10) / 10;
}
