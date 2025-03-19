<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import 'remixicon/fonts/remixicon.css';
	let { children } = $props();

	let isLoading = $state(true);

	async function detectSWUpdate() {
		const registration = await navigator.serviceWorker.getRegistration();
		registration?.addEventListener('updatefound', () => {
			const newWorker = registration.installing;
			newWorker?.addEventListener('statechange', () => {
				if (newWorker.state === 'installed') {
					const update = confirm('A new version is available. Do you want to update?');
					if (update) {
						newWorker.postMessage({ type: 'SKIP_WAITING' });
						location.reload();
					}
				}
			});
		});
	}

	onMount(() => {
		detectSWUpdate();
		isLoading = false;
	});
</script>

{#if isLoading}
	<div class="container-center">
		<i class="ri-loader-2-line animate-spin text-6xl"></i>
	</div>
{:else}
	{@render children()}
{/if}
