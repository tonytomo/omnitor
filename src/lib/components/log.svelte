<script lang="ts">
	import { browser } from '$app/environment';
	import logs, { addLog, clearLog } from '$lib/stores/log-store';
	import { scrollIntoViewInsideElement } from '$lib/utils/dom';
	import { formatISODate } from '$lib/utils/format';

	let message: string = '';

	$: {
		if ($logs && browser) {
			setTimeout(() => {
				const logContainer = document.querySelector('.log-container') as HTMLElement | null;
				const lastLog = document.querySelector('.log:last-child') as HTMLElement | null;
				scrollIntoViewInsideElement(logContainer, lastLog);
			}, 0);
		}
	}
</script>

<section class="flex flex-col gap-2">
	<div class="container-block justify-end bg-slate-900 py-2 pr-2 pl-4">
		<div class="log-container h-min overflow-y-auto">
			{#each $logs as entry}
				<p class="log font-mono text-sm">
					<span class="text-slate-600">> {formatISODate(entry.datetime)} --></span>
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
			on:keyup={(e) => {
				if (e.key === 'Enter') {
					addLog(message);
					message = '';
				}
			}}
		/>
		<button
			class="btn"
			on:click={() => {
				addLog(message);
				message = '';
			}}
		>
			Send
		</button>
		<button class="btn" on:click={clearLog}>Clear</button>
	</div>
</section>
