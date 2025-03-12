<script lang="ts">
	import { setInfo } from '$lib/stores/info-store';
	import record from '$lib/stores/record-store';
	import { State } from '$lib/types/record';
	import { onMount } from 'svelte';
	import { on } from 'svelte/events';

	onMount(() => {
		$record.threshold = { upper: 45, lower: 15 };
		$record.name = 'Temperature';
		$record.unit = '°C';
	});
</script>

<section class="form-container">
	<label class="form">
		<span class="form-label">
			<i class="ri-dashboard-3-line"></i>
		</span>
		<button
			aria-label="Info"
			class="btn btn-info"
			on:click={() =>
				setInfo({
					name: 'Metrics',
					icon: 'ri-dashboard-3-line',
					definition: 'Values that are being measured.'
				})}
		>
			<i class="ri-information-2-line"></i>
		</button>
		<input bind:value={$record.name} class="input" disabled={$record.state === State.RUNNING} />
	</label>
	<label class="form">
		<span class="form-label">
			<i class="ri-thermometer-line"></i>
		</span>
		<button
			aria-label="Info"
			class="btn btn-info"
			on:click={() =>
				setInfo({
					name: 'Unit',
					icon: 'ri-thermometer-line',
					definition: 'The unit of measurement.'
				})}
		>
			<i class="ri-information-2-line"></i>
		</button>
		<input bind:value={$record.unit} class="input" disabled={$record.state === State.RUNNING} />
	</label>
	<label class="form">
		<span class="form-label">
			<i class="ri-skip-up-line"></i>
		</span>
		<button
			aria-label="Info"
			class="btn btn-info"
			on:click={() =>
				setInfo({
					name: 'Upper Threshold',
					icon: 'ri-skip-up-line',
					definition: 'The upper limit of the threshold.'
				})}
		>
			<i class="ri-information-2-line"></i>
		</button>
		<input
			type="number"
			bind:value={$record.threshold.upper}
			class="input"
			disabled={$record.state === State.RUNNING}
		/>
	</label>
	<label class="form">
		<span class="form-label">
			<i class="ri-skip-down-line"></i>
		</span>
		<button
			aria-label="Info"
			class="btn btn-info"
			on:click={() =>
				setInfo({
					name: 'Lower Threshold',
					icon: 'ri-skip-down-line',
					definition: 'The lower limit of the threshold.'
				})}
		>
			<i class="ri-information-2-line"></i>
		</button>
		<input
			type="number"
			bind:value={$record.threshold.lower}
			class="input"
			disabled={$record.state === State.RUNNING}
		/>
	</label>
</section>
