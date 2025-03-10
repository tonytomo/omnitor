<script lang="ts">
	import { browser } from '$app/environment';
	import record, { resetRecord } from '$lib/stores/recordStore';
	import type { Log } from '$lib/types/log';
	import { State } from '$lib/types/record';
	import { scrollIntoViewInsideElement } from '$lib/utils/dom';
	import { calculateMovingAverage, calculateTrend, toPercent } from '$lib/utils/number';
	import { onMount } from 'svelte';

	let logs: Log[] = [];
	let datetime: string = '';
	let message: string = '';
	let index: number = 0;
	let trend: number = 0;
	let interval: number = 0;

	onMount(() => {
		$record.threshold = { upper: 40, lower: 15 };
	});

	function toggleRecord() {
		if ($record.state === State.STOPPED) {
			$record.state = State.RUNNING;
			interval = setInterval(listenCom, 1000);
		} else {
			$record.state = State.STOPPED;
			clearInterval(interval);
		}
	}

	function listenCom() {
		if ($record.state === State.STOPPED) return;

		const randomNumber = Math.floor(Math.random() * 20) + 20;
		const blockSize = 5;
		const newData = calculateMovingAverage($record.data, blockSize, randomNumber);
		const com = newData + '°C';

		$record.data = [...$record.data, newData];
		$record.dataInPercent = [
			...$record.dataInPercent,
			toPercent(newData, $record.threshold.upper, $record.threshold.lower)
		];

		trend = Math.round(calculateTrend($record.data) * 10) / 10;
		datetime = new Date().toISOString();
		logs = [...logs, { datetime, message: com }];
		index = $record.data.length - 1;
	}

	function log() {
		if (!message) return;
		if (message === 'cls' || message === 'clear') {
			logs = [];
		} else {
			datetime = new Date().toISOString();
			logs = [...logs, { datetime, message }];
		}
		message = '';
	}

	function clear() {
		logs = [];
	}

	$: {
		if (logs && browser) {
			setTimeout(() => {
				const logContainer = document.querySelector('.log-container') as HTMLElement | null;
				const lastLog = document.querySelector('.log:last-child') as HTMLElement | null;
				scrollIntoViewInsideElement(logContainer, lastLog);

				const graphContainer = document.querySelector('.graph-container') as HTMLElement | null;
				const lastGraph = document.querySelector('.graph:last-child') as HTMLElement | null;
				scrollIntoViewInsideElement(graphContainer, lastGraph);
			}, 0);
		}
	}
</script>

<main
	class="items-strecth container mx-auto grid grid-cols-1 gap-2 px-4 py-10 md:grid-cols-2 lg:grid-cols-3"
>
	<section class="flex flex-col gap-2">
		<div
			class="flex h-56 flex-col justify-end border border-slate-800 bg-slate-900 py-2 pr-2 pl-4 lg:h-80"
		>
			<div class="log-container h-min overflow-y-auto">
				{#each logs as entry}
					<p class="log font-mono text-sm">
						<span class="text-slate-600">> {entry.datetime} --></span>
						{entry.message}
					</p>
				{/each}
			</div>
		</div>

		<div class="flex gap-2">
			<input
				type="text"
				class="input"
				name="message"
				placeholder="Enter message"
				autocomplete="off"
				bind:value={message}
				on:keyup={(e) => e.key === 'Enter' && log()}
			/>
			<button class="btn" on:click={log}>Send</button>
			<button class="btn" on:click={clear}>Clear</button>
		</div>
	</section>
	<section class="col-span-1 flex flex-col gap-2 lg:col-span-2">
		<div
			class="relative flex h-56 flex-col items-end justify-end border border-slate-800 pr-20 lg:h-80"
		>
			<div
				class="graph-container flex h-full w-full flex-row items-end overflow-x-scroll whitespace-nowrap"
			>
				<div class="flex h-full w-min items-end">
					{#each $record.data as entry, i}
						<div
							class={'graph w-3 border-t-4 border-teal-600 bg-teal-800 hover:bg-teal-600 ' +
								(i === index ? 'opacity-100' : 'opacity-30')}
							style={`height: ${$record.dataInPercent[i]}%`}
						></div>
					{/each}
				</div>
			</div>
			<figure class="absolute top-2 left-2 p-2 text-xs text-slate-600">
				<figcaption>Temperature Data</figcaption>
			</figure>
			<figure class="absolute top-2 right-2 flex items-center gap-4 p-2">
				<h3 class="text-md {trend > 0 ? 'text-red-400' : 'text-blue-400'}">
					{trend > 0 ? '▲' : '▼'}
					{Math.abs(trend)}
				</h3>
				<figcaption class="text-6xl font-semibold text-white">
					{$record.data[index] || 0}°C
				</figcaption>
			</figure>
		</div>
		<div class="flex gap-2">
			<button class="btn flex-1" on:click={toggleRecord}>
				{$record.state === State.STOPPED ? 'Run' : 'Halt'}
			</button>
			<button class="btn flex-1">Zoom Out</button>
			<button class="btn flex-1">Zoom In</button>
			<button class="btn flex-1">Export</button>
		</div>
	</section>
</main>
