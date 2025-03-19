<script lang="ts">
	interface InputProps {
		name: string;
		placeholder?: string;
		onEnter: () => void;
		value: string;
		readonly?: boolean;
	}

	let { name, placeholder, onEnter, value = $bindable(''), readonly }: InputProps = $props();
</script>

<input
	{readonly}
	type="text"
	class="lone-input"
	{name}
	placeholder={placeholder || `Enter ${name}`}
	autocomplete="off"
	bind:value
	onkeyup={(e) => {
		if (e.key === 'Enter') onEnter();
	}}
/>
