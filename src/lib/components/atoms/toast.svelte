<script lang="ts">
	import toast from '$lib/stores/toast-store';

	$: {
		if ($toast.message) {
			setTimeout(() => {
				toast.set({ id: '', message: '', type: 'info' });
			}, $toast.duration || 3000);
		}
	}
</script>

{#if $toast.id}
	<div class="toast {$toast.type}">
		{#if $toast.type === 'success'}
			<i class="ri-checkbox-circle-line"></i>
		{:else if $toast.type === 'error'}
			<i class="ri-close-circle-line"></i>
		{:else if $toast.type === 'info'}
			<i class="ri-information-line"></i>
		{/if}

		{$toast.message}
	</div>
{/if}
