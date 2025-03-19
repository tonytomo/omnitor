<script lang="ts">
	import record from '$lib/stores/record-store';
	import stats from '$lib/stores/stats-store';
	import Button from '../atoms/button.svelte';

	let displayInfo = 'hidden';

	function toggleInfo() {
		displayInfo = displayInfo === 'hidden' ? 'flex' : 'hidden';
	}
</script>

<section class="col-span-1 flex flex-col gap-2">
	<div class="container-block p-2">
		<h4 class="text-sm">
			<i class="ri-calculator-line"></i>
			{$record.name} ({$record.unit})
		</h4>
		<Button ariaLabel="Toggle info" color="btn-ghost absolute top-0 right-0" onClick={toggleInfo}>
			<i class="ri-arrow-down-s-line"></i>
		</Button>
		<div class="{displayInfo} max-h-28 flex-col flex-wrap gap-1 text-xs text-slate-500 md:max-h-20">
			<p>Total data: <span class="text-white">{$stats.total}</span></p>
			<p>Mean: <span class="text-white">{$stats.mean}</span></p>
			<p>Max: <span class="text-white">{$stats.max}</span></p>
			<p>Min: <span class="text-white">{$stats.min}</span></p>
			<p>Variance: <span class="text-white">{$stats.variance}</span></p>
			<p>Precision: <span class="text-white">{$stats.precision}</span></p>
			<p>Accuracy: <span class="text-white">{$stats.accuracy}</span></p>
		</div>
	</div>
</section>
