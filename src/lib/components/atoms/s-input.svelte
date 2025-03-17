<script lang="ts">
	import { type Snippet } from 'svelte';

	interface SInputProps {
		children: Snippet;
		value: string | number;
		disabled?: boolean;
		info?: string;
	}

	let { children, value = $bindable(''), disabled, info }: SInputProps = $props();
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
		<input bind:value class="input" {disabled} />
	</label>
{:else}
	<label class="form">
		<span class="form-label">
			{@render children()}
		</span>
		<input bind:value class="input" {disabled} />
	</label>
{/if}
