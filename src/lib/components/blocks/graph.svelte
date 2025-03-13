<script lang="ts">
	import { addLog } from '$lib/stores/log-store';
	import { State } from '$lib/types/record';
	import record, {
		addRawData,
		addProcessedData,
		setState,
		resetRecord
	} from '$lib/stores/record-store';
	import { toPercent, calculateTrend, getRandomNumber, processValue } from '$lib/utils/number';
	import Button from '../atoms/button.svelte';

	const zooms = ['w-2', 'w-3', 'w-4', 'w-5', 'w-6', 'w-7', 'w-8', 'w-9', 'w-10', 'w-11', 'w-12'];
	const rawFocus = ['opacity-100', 'opacity-100', 'opacity-10'];
	const processFocus = ['opacity-100', 'opacity-10', 'opacity-100'];

	let index: number = 0;
	let trend: number = 0;
	let interval: number = 0;
	let rawDataInPercent: number[] = [];
	let processDataInPercent: number[] = [];
	let zoomIndex: number = 5;
	let focusIndex: number = 0;

	async function listenCom() {
		if ($record.state === State.STOPPED) return;

		const randomNumber = getRandomNumber();

		const value = processValue(randomNumber);

		addLog(`R:${randomNumber} | P: ${value}`);
		addRawData(randomNumber);
		addProcessedData(value);

		rawDataInPercent.push(toPercent(randomNumber));
		processDataInPercent.push(toPercent(value));

		trend = Math.round(calculateTrend() * 10) / 10;
		index = $record.processedData.length - 1;
	}

	function resetAll() {
		resetRecord();
		rawDataInPercent = [];
		processDataInPercent = [];
		trend = 0;
		index = 0;
	}

	function toggleFocus() {
		focusIndex = (focusIndex + 1) % 3;
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
			interval = setInterval(listenCom, 200);
			addLog('Record started');
		} else {
			setState(State.STOPPED);
			clearInterval(interval);
			addLog('Record stopped');
		}
	}
</script>

<section class="col-span-1 flex flex-col gap-2 xl:col-span-2">
	<div class="container-block items-end justify-end pr-36">
		<div class="chart">
			<div class="chart-container">
				{#each $record.rawData as entry, i}
					<div
						class={zooms[zoomIndex] +
							' chart-bar border-x border-t-4 border-slate-800 border-t-red-400 from-red-400/25 ' +
							rawFocus[focusIndex]}
						style={`height: ${rawDataInPercent[i]}%`}
					></div>
				{/each}
			</div>
			<div class="chart-container">
				{#each $record.processedData as entry, i}
					<div
						class={zooms[zoomIndex] +
							' chart-bar cursor-pointer border-x  border-t-4 border-slate-800 border-t-blue-400 from-blue-400/25 hover:opacity-60 ' +
							processFocus[focusIndex]}
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
				{#if trend > 0}
					<i class="ri-arrow-up-long-fill"></i>
				{:else}
					<i class="ri-arrow-down-long-fill"></i>
				{/if}
				{Math.abs(trend)}
			</h3>
			<h2 class="text-4xl font-semibold">
				{$record.processedData[index] || 0}<span class="font-normal">{$record.unit}</span>
			</h2>
		</figure>
		<figure class="chart-raw">
			<h2>Raw: {$record.rawData[index] || 0}{$record.unit}</h2>
		</figure>
		<figure class="chart-legend">
			<figcaption class="text-red-400">
				<i class="ri-square-fill"></i>
				Raw
			</figcaption>
			<figcaption class="text-blue-400">
				<i class="ri-square-fill"></i>
				Processed
			</figcaption>
		</figure>
	</div>
	<div class="flex gap-2">
		<Button
			ariaLabel={$record.state === State.STOPPED ? 'Run' : 'Halt'}
			color={$record.state === State.STOPPED ? 'btn-green' : 'btn-red'}
			onClick={toggleRecord}
		>
			{#if $record.state === State.STOPPED}
				<i class="ri-play-fill"></i>
			{:else}
				<i class="ri-stop-fill"></i>
			{/if}
		</Button>
		<Button ariaLabel="Zoom Out" color="btn-base" onClick={zoomOut}>
			<i class="ri-zoom-out-line"></i>
		</Button>
		<Button ariaLabel="Zoom In" color="btn-base" onClick={zoomIn}>
			<i class="ri-zoom-in-line"></i>
		</Button>
		<Button ariaLabel="Focus" color="btn-base" onClick={toggleFocus}>
			<i class="ri-focus-3-line"></i>
		</Button>
		<Button
			ariaLabel="Delete"
			disabled={$record.state === State.RUNNING}
			color="btn-red"
			onClick={resetAll}
		>
			<i class="ri-delete-bin-2-line"></i>
		</Button>
		<Button
			ariaLabel="Export"
			disabled={$record.state === State.RUNNING}
			color="btn-blue"
			onClick={() => console.log('Export')}
		>
			<i class="ri-download-2-line"></i>
		</Button>
	</div>
</section>
