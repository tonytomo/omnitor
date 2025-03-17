<script lang="ts">
	import { type Snippet } from 'svelte';

	interface Option {
		label: string;
		value: string;
	}

	interface SSelectProps {
		children: Snippet;
		value: string | number;
		placeholder?: string;
		disabled?: boolean;
		info?: string;
		options: Option[];
	}

	let {
		children,
		value = $bindable(''),
		placeholder,
		disabled,
		info,
		options
	}: SSelectProps = $props();
	let visibility = $state('invisible opacity-0');

	function toggle() {
		if (visibility === 'invisible opacity-0') {
			visibility = 'visible opacity-100';
			return;
		}
		hide();
	}

	function hide() {
		visibility = 'invisible opacity-0';
	}
</script>

{#if info}
	<label class="form">
		<span class="form-label">
			{@render children()}
		</span>
		<button aria-label="Info" class="btn btn-info" onclick={toggle} onblur={hide}>
			<i class="ri-information-2-line"></i>
			<span class="tooltip {visibility}">
				<i class="ri-information-2-line"></i>
				{info}
			</span>
		</button>
		<select bind:value class="input col-span-2" {disabled} {placeholder}>
			{#each options as { label, value }}
				<option {value}>{label}</option>
			{/each}
		</select>
	</label>
{:else}
	<label class="form">
		<span class="form-label">
			{@render children()}
		</span>
		<select bind:value class="input col-span-2" {disabled}>
			<option selected>{placeholder || 'Select'}</option>
			{#each options as { label, value }}
				<option {value}>{label}</option>
			{/each}
		</select>
	</label>
{/if}
