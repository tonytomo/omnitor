<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	interface SSelectProps {
		children: Snippet;
		value: string | number;
		disabled?: boolean;
		info: string;
		options: { label: string; value: string }[];
	}

	let { children, value = $bindable(''), disabled, info, options }: SSelectProps = $props();
	let visibility = $state('');

	onMount(() => {
		hide();
	});

	function show() {
		visibility = 'visible opacity-100';
	}

	function hide() {
		visibility = 'invisible opacity-0';
	}
</script>

<label class="form">
	<span class="form-label">
		{@render children()}
	</span>
	<button aria-label="Info" class="btn btn-info" onclick={show} onblur={hide}>
		<i class="ri-information-2-line"></i>
		<span class="tooltip {visibility}">
			<i class="ri-information-2-line"></i>
			{info}
		</span>
	</button>
	<select bind:value class="input col-span-2" {disabled}>
		{#each options as { label, value }}
			<option {value}>{label}</option>
		{/each}
	</select>
</label>
