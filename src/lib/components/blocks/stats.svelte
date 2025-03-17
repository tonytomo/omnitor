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
			<i class="ri-information-2-line"></i>
			{$record.name} ({$record.unit})
		</h4>
		<Button ariaLabel="Toggle info" color="btn-ghost absolute top-0 right-0" onClick={toggleInfo}>
			<i class="ri-arrow-down-s-line"></i>
		</Button>
		<div class="{displayInfo} max-h-28 flex-col flex-wrap gap-1 text-xs md:max-h-20">
			<p>Total data: {$stats.total}</p>
			<p>Mean: {$stats.mean}</p>
			<p>Max: {$stats.max}</p>
			<p>Min: {$stats.min}</p>
			<p>Variance: {$stats.variance}</p>
			<p>Precision: {$stats.precision}</p>
			<p>Accuracy: {$stats.accuracy}</p>
		</div>
	</div>
</section>
