<script lang="ts">
	import { addLog } from '$lib/stores/log-store';
	import { State, Status } from '$lib/types/record';
	import { toPercent, calculateTrend, getRandomNumber, processValue } from '$lib/utils/number';
	import Button from '../atoms/button.svelte';
	import record, {
		addRawData,
		addProcessedData,
		setState,
		resetRecord
	} from '$lib/stores/record-store';
	import { zooms, zoomsMap } from '$lib/constants/graph-zoom';
	import { proc, raw } from '$lib/constants/graph-focus';
	import { calculateStats } from '$lib/stores/stats-store';

	let index: number = 0;
	let trend: number = 0;
	let interval: number = 0;
	let rawDataInPercent: number[] = [];
	let processDataInPercent: number[] = [];
	let zoom: number = 5;
	let focus: number = 0;

	async function listenCom() {
		if ($record.state === State.IDLE) return;

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
		calculateStats();
		rawDataInPercent = [];
		processDataInPercent = [];
		trend = 0;
		index = 0;
	}

	function toggleFocus() {
		focus = (focus + 1) % 3;
	}

	function zoomIn() {
		if (zoom < zooms.length - 1) {
			zoom++;
		}
	}

	function zoomOut() {
		if (zoom > 0) {
			zoom--;
		}
	}

	function toggleRecord() {
		if ($record.state === State.IDLE) {
			setState(State.RUNNING);
			interval = setInterval(listenCom, 200);
			addLog('Record started');
		} else {
			setState(State.IDLE);
			clearInterval(interval);
			addLog('Record stopped');
		}
	}
</script>

<section class="col-span-2 flex flex-col gap-2 xl:col-span-2">
	<div class="container-block-56 items-end justify-end pr-36">
		<div class="chart">
			<div class="chart-container">
				{#each $record.rawData as entry, i}
					<div
						class={zooms[zoom] + ' chart-bar border-t-red-400 from-red-400/25 ' + raw[focus]}
						style={`height: ${rawDataInPercent[i]}%`}
					></div>
				{/each}
			</div>
			<div class="chart-container">
				{#each $record.processedData as entry, i}
					<div
						class={zooms[zoom] + ' chart-bar border-t-blue-400 from-blue-400/25 ' + proc[focus]}
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
			<figcaption class="text-red-400 {raw[focus]}">
				<i class="ri-square-fill"></i>
				Raw
			</figcaption>
			<figcaption class="text-blue-400 {proc[focus]}">
				<i class="ri-square-fill"></i>
				Processed
			</figcaption>
		</figure>
	</div>
	<div class="flex gap-2">
		<Button
			disabled={$record.status === Status.CONNECTED}
			ariaLabel={$record.state === State.IDLE ? 'Run' : 'Halt'}
			color={$record.state === State.IDLE ? 'btn-green' : 'btn-red'}
			onClick={toggleRecord}
		>
			{#if $record.state === State.IDLE}
				<i class="ri-play-fill"></i>
			{:else}
				<i class="ri-stop-fill"></i>
			{/if}
		</Button>
		<div class="flex flex-1">
			<Button ariaLabel="Zoom Out" color="btn-base" onClick={zoomOut}>
				<i class="ri-zoom-out-line"></i>
			</Button>
			<input readonly type="text" class="small-input" value={zoomsMap[zoom]} />
			<Button ariaLabel="Zoom In" color="btn-base" onClick={zoomIn}>
				<i class="ri-zoom-in-line"></i>
			</Button>
		</div>
		<Button ariaLabel="Focus" color="btn-blue" onClick={toggleFocus}>
			<i class="ri-focus-3-line"></i>
		</Button>
		<Button
			ariaLabel="Delete"
			disabled={$record.state === State.RUNNING || $record.status !== Status.CONNECTED}
			color="btn-red"
			onClick={resetAll}
		>
			<i class="ri-delete-bin-2-line"></i>
		</Button>
	</div>
</section>
