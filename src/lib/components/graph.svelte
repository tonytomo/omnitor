<script lang="ts">
	import { addLog } from '$lib/stores/log-store';
	import { State } from '$lib/types/record';
	import record, { addRawData, addProcessedData, setState } from '$lib/stores/record-store';
	import { toPercent, calculateTrend, getRandomNumber, processValue } from '$lib/utils/number';

	const zooms = ['w-2', 'w-3', 'w-4', 'w-5', 'w-6', 'w-7', 'w-8', 'w-9', 'w-10', 'w-11', 'w-12'];

	let index: number = 0;
	let trend: number = 0;
	let interval: number = 0;
	let rawDataInPercent: number[] = [];
	let processDataInPercent: number[] = [];
	let zoomIndex: number = 5;

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
			interval = setInterval(listenCom, 2000);
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
							(i === index ? 'opacity-100' : 'opacity-30')}
						style={`height: ${rawDataInPercent[i]}%`}
					></div>
				{/each}
			</div>
			<div class="chart-container">
				{#each $record.processedData as entry, i}
					<div
						class={zooms[zoomIndex] +
							' chart-bar cursor-pointer border-x  border-t-4 border-slate-800 border-t-blue-400 from-blue-400/25 hover:opacity-100 ' +
							(i === index ? 'opacity-100' : 'opacity-30')}
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
			<h2 class="text-4xl font-semibold">{$record.processedData[index] || 0}</h2>
			<h3 class="text-lg font-bold">{$record.unit}</h3>
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
		<button
			aria-label={$record.state === State.STOPPED ? 'Run' : 'Halt'}
			class="btn {$record.state === State.STOPPED ? 'btn-green' : 'btn-red'} flex-1"
			on:click={toggleRecord}
		>
			{#if $record.state === State.STOPPED}
				<i class="ri-play-fill"></i>
			{:else}
				<i class="ri-stop-fill"></i>
			{/if}
		</button>
		<button aria-label="Zoom Out" class="btn btn-base flex-1" on:click={zoomOut}>
			<i class="ri-zoom-out-line"></i>
		</button>
		<button aria-label="Zoom In" class="btn btn-base flex-1" on:click={zoomIn}>
			<i class="ri-zoom-in-line"></i>
		</button>
		<button
			aria-label="Delete"
			disabled={$record.state === State.RUNNING}
			class="btn btn-red flex-1"
		>
			<i class="ri-delete-bin-2-line"></i>
		</button>
		<button
			aria-label="Export"
			disabled={$record.state === State.RUNNING}
			class="btn btn-blue flex-1"
		>
			<i class="ri-download-2-line"></i>
		</button>
	</div>
</section>
