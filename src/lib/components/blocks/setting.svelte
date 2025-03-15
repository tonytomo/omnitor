<script lang="ts">
	import record from '$lib/stores/record-store';
	import { State } from '$lib/types/record';
	import { onMount } from 'svelte';
	import SInput from '../atoms/s-input.svelte';

	onMount(() => {
		$record.threshold = { upper: 45, lower: 15 };
		$record.name = 'Temperature';
		$record.unit = '°C';
	});
</script>

<section class="form-container">
	<SInput
		bind:value={$record.name}
		disabled={$record.state === State.RUNNING}
		info="The name of the record."
	>
		<i class="ri-dashboard-3-fill"></i>
	</SInput>
	<SInput
		bind:value={$record.unit}
		disabled={$record.state === State.RUNNING}
		info="The unit of the record."
	>
		<i class="ri-thermometer-fill"></i>
	</SInput>
	<SInput
		bind:value={$record.threshold.upper}
		disabled={$record.state === State.RUNNING}
		info="The upper limit of the threshold."
	>
		<i class="ri-skip-up-fill"></i>
	</SInput>
	<SInput
		bind:value={$record.threshold.lower}
		disabled={$record.state === State.RUNNING}
		info="The lower limit of the threshold."
	>
		<i class="ri-skip-down-fill"></i>
	</SInput>
	<SInput
		bind:value={$record.setting.target}
		disabled={$record.state === State.RUNNING}
		info="Target value as a reference."
	>
		<i class="ri-focus-2-line"></i>
	</SInput>
</section>
