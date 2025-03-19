/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope;

import { build, files, version } from '$service-worker';

const CACHE = `cache-${version}`;
const ASSETS = build.concat(files);

self.addEventListener('install', (event) => {
	async function preCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}

	event.waitUntil(preCache());
});

self.addEventListener('activate', (event) => {
	async function clearCache() {
		const keys = await caches.keys();
		await Promise.all(keys.map((key) => key !== CACHE && caches.delete(key)));
	}

	event.waitUntil(clearCache());
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	async function fetchAsset() {
		const request = event.request;
		const url = new URL(request.url);
		const cache = await caches.open(CACHE);

		if (ASSETS.includes(url.pathname)) {
			const asset = await cache.match(url.pathname);
			if (asset) return asset;
		}

		try {
			const response = await fetch(request);
			const isNotExtension = url.protocol.startsWith('http') && !url.pathname.includes('.');
			const isSuccessful = response.status === 200;
			if (isNotExtension && isSuccessful) {
				await cache.put(request, response.clone());
			}

			return response;
		} catch (error) {
			const cachedAsset = await cache.match(url.pathname);
			if (cachedAsset) return cachedAsset;
		}

		return new Response('Not found', { status: 404 });
	}

	event.respondWith(fetchAsset());
});

self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});
