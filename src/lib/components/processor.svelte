<script lang="ts">
	import { setInfo } from '$lib/stores/info-store';
	import record from '$lib/stores/record-store';
	import { State, Process } from '$lib/types/record';
</script>

<section class="form-container">
	<label class="form">
		<span class="form-label">
			<i class="ri-instance-line"></i>
		</span>
		<button
			aria-label="Info"
			class="btn btn-info"
			on:click={() =>
				setInfo({
					name: 'Data Processor',
					icon: 'ri-instance-line',
					definition: 'Processes the data with different algorithms.'
				})}
		>
			<i class="ri-information-2-line"></i>
		</button>
		<select
			bind:value={$record.process}
			class="input col-span-2"
			disabled={$record.state === State.RUNNING}
		>
			<option value={Process.RAW}>Raw</option>
			<option value={Process.MAVG}>Moving Average</option>
			<option value={Process.MMED}>Moving Median</option>
			<option value={Process.LREG}>Linear Regression</option>
		</select>
	</label>
	<label class="form">
		<span class="form-label">
			<i class="ri-stack-line"></i>
		</span>
		<button
			aria-label="Info"
			class="btn btn-info"
			on:click={() =>
				setInfo({
					name: 'Window Size',
					icon: 'ri-stack-line',
					definition: 'The number of data points to consider for moving average or median.'
				})}
		>
			<i class="ri-information-2-line"></i>
		</button>
		<input
			type="number"
			bind:value={$record.setting.window}
			class="input col-span-2"
			disabled={$record.state === State.RUNNING ||
				$record.process === Process.RAW ||
				$record.process === Process.LREG}
		/>
	</label>
	<label class="form">
		<span class="form-label">
			<i class="ri-xrp-line"></i>
		</span>
		<button
			aria-label="Info"
			class="btn btn-info"
			on:click={() =>
				setInfo({
					name: 'Intercept',
					icon: 'ri-xrp-line',
					definition: 'The y-intercept of the linear regression.'
				})}
		>
			<i class="ri-information-2-line"></i>
		</button>
		<input
			type="number"
			bind:value={$record.setting.intercept}
			class="input col-span-2"
			disabled={$record.state === State.RUNNING || $record.process !== Process.LREG}
		/>
	</label>
	<label class="form">
		<span class="form-label">
			<i class="ri-ruler-line"></i>
		</span>
		<button
			aria-label="Info"
			class="btn btn-info"
			on:click={() =>
				setInfo({
					name: 'Slope',
					icon: 'ri-ruler-line',
					definition: 'The slope of the linear regression.'
				})}
		>
			<i class="ri-information-2-line"></i>
		</button>
		<input
			type="number"
			bind:value={$record.setting.slope}
			class="input col-span-2"
			disabled={$record.state === State.RUNNING || $record.process !== Process.LREG}
		/>
	</label>
</section>
