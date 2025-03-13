<script lang="ts">
	interface InputProps {
		name: string;
		placeholder?: string;
		onEnter: () => void;
		value: string;
	}

	let { name, placeholder, onEnter, value = $bindable('') }: InputProps = $props();
</script>

<input
	type="text"
	class="input"
	{name}
	placeholder={placeholder || `Enter ${name}`}
	autocomplete="off"
	bind:value
	onkeyup={(e) => {
		if (e.key === 'Enter') onEnter();
	}}
/>
