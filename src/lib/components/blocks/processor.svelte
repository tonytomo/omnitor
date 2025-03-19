<script lang="ts">
	import record from '$lib/stores/record-store';
	import { State, Process } from '$lib/types/record';
	import SInput from '../atoms/s-input.svelte';
	import SSelect from '../atoms/s-select.svelte';

	const options = [
		{ label: 'Raw', value: Process.RAW },
		{ label: 'Moving Average', value: Process.MAVG },
		{ label: 'Moving Median', value: Process.MMED },
		{ label: 'Linear Regression', value: Process.LREG }
	];
</script>

<section class="flex flex-1 flex-col gap-2">
	<SSelect
		bind:value={$record.process}
		disabled={$record.state === State.RUNNING}
		info="The process to apply to the record."
		{options}
	>
		<i class="ri-cpu-line"></i>
	</SSelect>
	<SInput
		bind:value={$record.setting.window}
		disabled={$record.state === State.RUNNING ||
			($record.process !== Process.MAVG && $record.process !== Process.MMED)}
		info="The window size of the moving average or moving median."
	>
		<i class="ri-window-fill"></i>
	</SInput>
	<SInput
		bind:value={$record.setting.intercept}
		disabled={$record.state === State.RUNNING || $record.process !== Process.LREG}
		info="The y-intercept of the linear regression."
	>
		<i class="ri-xrp-fill"></i>
	</SInput>
	<SInput
		bind:value={$record.setting.slope}
		disabled={$record.state === State.RUNNING || $record.process !== Process.LREG}
		info="The slope of the linear regression."
	>
		<i class="ri-ruler-fill"></i>
	</SInput>
</section>
