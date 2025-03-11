<script lang="ts">
	import { addLog } from '$lib/stores/log-store';
	import record, { addRawData, addProcessedData, setState } from '$lib/stores/record-store';
	import { State } from '$lib/types/record';
	import { calculateMovingAverage, toPercent, calculateTrend } from '$lib/utils/number';

	const zooms = ['w-2', 'w-3', 'w-4', 'w-5', 'w-6', 'w-7', 'w-8'];

	let index: number = 0;
	let trend: number = 0;
	let interval: number = 0;
	let rawDataInPercent: number[] = [];
	let processDataInPercent: number[] = [];
	let zoomIndex: number = 1;

	function listenCom() {
		if ($record.state === State.STOPPED) return;

		const randomNumber = Math.floor(Math.random() * 20) + 20;
		const blockSize = 5;
		const value = calculateMovingAverage($record.rawData, blockSize, randomNumber);

		addLog(`R:${randomNumber} | P: ${value}`);
		addRawData(randomNumber);
		addProcessedData(value);

		rawDataInPercent.push(toPercent(randomNumber));
		processDataInPercent.push(toPercent(value));

		trend = Math.round(calculateTrend($record.processedData) * 10) / 10;
		index = $record.processedData.length - 1;
	}

	function zoomIn() {
		if (zoomIndex < zooms.length - 1) {
			zoomIndex++;
		}
	}

	function zoomOut() {
		if (zoomIndex > 0) {
			zoomIndex--;
		}
	}

	function toggleRecord() {
		if ($record.state === State.STOPPED) {
			setState(State.RUNNING);
			interval = setInterval(listenCom, 1000);
		} else {
			setState(State.STOPPED);
			clearInterval(interval);
		}
	}
</script>

<section class="col-span-1 flex flex-col gap-2 xl:col-span-2">
	<div class="container-block items-end justify-end pr-36">
		<div class="chart">
			<div class="chart-bar">
				{#each $record.rawData as entry, i}
					<div
						class={zooms[zoomIndex] +
							' border-x border-t-4 border-slate-800 border-t-red-400 ' +
							(i === index ? 'opacity-100' : 'opacity-50')}
						style={`height: ${rawDataInPercent[i]}%`}
					></div>
				{/each}
			</div>
			<div class="chart-bar">
				{#each $record.processedData as entry, i}
					<div
						class={zooms[zoomIndex] +
							' border-x border-t-4 border-slate-800 border-t-blue-400 ' +
							(i === index ? 'opacity-100' : 'opacity-50')}
						style={`height: ${processDataInPercent[i]}%`}
					></div>
				{/each}
			</div>
		</div>
		<figure class="chart-title">
			<figcaption>{$record.name} [{$record.process}]</figcaption>
		</figure>
		<figure class="chart-value">
			<h3 class="text-xs {trend > 0 ? 'text-red-400' : 'text-blue-400'}">
				{trend > 0 ? '▲' : '▼'}
				{Math.abs(trend)}
			</h3>
			<h2 class="text-4xl font-semibold">{$record.processedData[index] || 0}</h2>
			<h3 class="text-lg font-bold">{$record.unit}</h3>
		</figure>
		<figure class="chart-legend">
			<figcaption class="text-red-400">● Raw</figcaption>
			<figcaption class="text-blue-400">● Processed</figcaption>
		</figure>
	</div>
	<div class="flex gap-2">
		<button class="btn flex-1" on:click={toggleRecord}>
			{$record.state === State.STOPPED ? 'Run' : 'Halt'}
		</button>
		<button class="btn flex-1" on:click={zoomOut}> Zoom Out </button>
		<button class="btn flex-1" on:click={zoomIn}> Zoom In </button>
		<button class="btn flex-1">Export</button>
	</div>
</section>
