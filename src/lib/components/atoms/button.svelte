<script lang="ts">
	import type { Snippet } from 'svelte';

	interface ButtonProps {
		ariaLabel: string;
		info?: string;
		color: string;
		disabled?: boolean;
		onClick: () => void;
		children: Snippet;
	}

	let props: ButtonProps = $props();
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

{#if props.info}
	<div class="flex flex-1">
		<button aria-label="Info" class="btn btn-info" onclick={toggle} onblur={hide}>
			<i class="ri-information-2-line"></i>
			<span class="tooltip {visibility}">
				<i class="ri-information-2-line"></i>
				{props.info}
			</span>
		</button>
		<button
			disabled={props.disabled}
			aria-label={props.ariaLabel}
			class={'btn flex-1 ' + props.color}
			onclick={props.onClick}
		>
			{@render props.children()}
		</button>
	</div>
{:else}
	<button
		disabled={props.disabled}
		aria-label={props.ariaLabel}
		class={'btn flex-1 ' + props.color}
		onclick={props.onClick}
	>
		{@render props.children()}
	</button>
{/if}
