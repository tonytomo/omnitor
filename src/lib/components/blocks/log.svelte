<script lang="ts">
	import { browser } from '$app/environment';
	import logs, { addLog, clearLog } from '$lib/stores/log-store';
	import { scrollIntoViewInsideElement } from '$lib/utils/dom';
	import { formatHMS } from '$lib/utils/format';
	import Button from '../atoms/button.svelte';
	import Input from '../atoms/input.svelte';

	let message: string = '';

	function log() {
		addLog(message);
		message = '';
	}

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

<section class="col-span-1 flex flex-col gap-2">
	<div class="container-block-56 justify-end bg-slate-900 p-2">
		<div class="log-container h-min overflow-y-auto">
			{#each $logs as entry}
				<p class="log font-mono text-xs">
					<span class="text-slate-600">> {formatHMS(entry.datetime)} --></span>
					{entry.message}
				</p>
			{/each}
		</div>
	</div>

	<div class="flex gap-2">
		<Input name="message" bind:value={message} onEnter={log} />
		<Button ariaLabel="Send" color="btn-blue" onClick={log}>
			<i class="ri-send-plane-line"></i>
		</Button>
		<Button ariaLabel="Clear" color="btn-red" onClick={clearLog}>
			<i class="ri-delete-bin-6-line"></i>
		</Button>
	</div>
</section>
