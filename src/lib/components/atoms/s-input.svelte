<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	interface SInputProps {
		children: Snippet;
		value: string | number;
		disabled?: boolean;
		info: string;
	}

	let { children, value = $bindable(''), disabled, info }: SInputProps = $props();
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
	<input bind:value class="input" {disabled} />
</label>
