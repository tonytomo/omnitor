<script lang="ts">
	import type { Snippet } from 'svelte';

	interface ButtonProps {
		ariaLabel: string;
		color: string;
		disabled?: boolean;
		onClick: () => void;
		children: Snippet;
	}

	let props: ButtonProps = $props();
</script>

<button
	disabled={props.disabled}
	aria-label={props.ariaLabel}
	class={'btn flex-1 ' + props.color}
	onclick={props.onClick}
>
	{@render props.children()}
</button>
