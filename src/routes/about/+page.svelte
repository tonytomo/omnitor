<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import Button from '$lib/components/atoms/button.svelte';
	import logo from '$lib/assets/logo.webp';
</script>

<svelte:head>
	<title>About | Omnitor</title>
	<meta
		name="description"
		content="Omnitor is a monitoring system that records and processes data from various sensors."
	/>
</svelte:head>

<main class="container-block gap-4 px-4 py-8 text-center text-sm">
	<Button ariaLabel="Back to home" color="btn-ghost w-min" onClick={() => goto(base + '/')}>
		<i class="ri-arrow-left-line"></i>
	</Button>
	<div class="block-content gap-8 p-4">
		<div class="logo mx-auto h-18 w-18">
			<img src={logo} alt="Omnitor logo" />
		</div>
		<h1 class="text-4xl font-bold">Omnitor</h1>
		<article class="flex flex-col gap-2 text-sm">
			<h2>Omnitor is a monitoring system that records and processes data from various sensors.</h2>
			<h3>
				This system uses usb, bluetooth low energy, and bluetooth classic to connect to sensors.
			</h3>
		</article>
		<section class="block-content gap-2 p-8 text-sm">
			<h2 class="text-xl font-bold">About the project</h2>
			<p>
				This project is built to make research and learning more exciting! Use it to monitor sensor
				data, process it for cool results like room temperature or soil humidity, and even calibrate
				sensors for accuracy. It's a handy tool for anyone curious and creative!
			</p>
			<p>
				This project is created using SvelteKit, Tailwind CSS, and Web API. The project is
				open-source which also available on GitHub.
			</p>
			<div class="mx-auto flex w-min justify-center gap-2">
				<Button
					ariaLabel="View source code"
					color="btn-blue"
					onClick={() => window.open('https://github.com/tonytomo/omnitor', '_blank')}
				>
					<i class="ri-github-fill"></i>
				</Button>
			</div>
		</section>
		<hr />
		<article class="guide">
			<div class="guide-element">
				<div class="btn btn-blue w-min">
					<i class="ri-bluetooth-connect-line"></i>
				</div>
				<p>Bluetooth Low Energy (BLE) Mode</p>
			</div>
			<p class="flex-2 text-left">
				BLE mode is used to connect to devices that support BLE, such as the ESP32. This mode can be
				used on both the Chrome desktop and mobile browsers. But, you need to configure the device
				to support BLE.
				<span class="text-green-500">Tips:</span>
				You can see the guide
				<a
					href="https://randomnerdtutorials.com/esp32-ble-server-client/"
					target="_blank"
					class="text-blue-500"
					rel="noopener noreferrer">here</a
				>.
			</p>
		</article>
		<article class="guide">
			<div class="guide-element">
				<div class="btn btn-blue w-min">
					<i class="ri-usb-line"></i>
				</div>
				<p>USB/Bluetooth Classic Mode</p>
			</div>
			<p class="flex-2 text-left">
				USB/Bluetooth Classic mode is used to connect to devices that support USB or Bluetooth
				Classic, such as the Arduino Uno and ESP32.
				<span class="text-yellow-500">Note:</span>
				This mode is ONLY available on the Chrome desktop browser.
			</p>
		</article>
		<article class="guide">
			<div class="guide-element">
				<div class="btn btn-teal w-min">
					<i class="ri-links-line"></i>
				</div>
				<p>Connect to device</p>
			</div>
			<p class="flex-2 text-left">
				After selecting the mode, you can connect to the device by clicking the connect button. You
				will see a dialog box showing the available devices. Select the device you want to connect
				to.
			</p>
		</article>
		<hr />
		<article class="guide">
			<div class="guide-element">
				<div class="btn btn-purple w-min">
					<i class="ri-clipboard-line"></i>
				</div>
				<p>Generate UUID</p>
			</div>
			<p class="flex-2 text-left">
				Before connecting to the BLE device, you need to generate a UUID. This UUID is used to
				identify the device. You can generate the UUID by clicking the generate UUID button and you
				will just need to copy the UUID to the device code.
			</p>
		</article>
		<article class="guide">
			<div class="guide-element">
				<div class="btn btn-base w-min rounded-md">
					<i class="ri-speed-line"></i>
				</div>
				<p>Set Baud Rate</p>
			</div>
			<p class="flex-2 text-left">
				Before connecting to the USB/Bluetooth Classic device, you need to set the baud rate. The
				baud rate is used to set the data transfer speed between the device and the computer.
				<span class="text-yellow-500">Note:</span>
				You need to set the baud rate to match the device's baud rate.
			</p>
		</article>
		<hr />
		<article class="guide">
			<div class="guide-element">
				<div class="btn btn-base w-min rounded-md">
					<i class="ri-calculator-fill"></i>
				</div>
				<p>Statistics</p>
			</div>
			<p class="flex-2 text-left">
				You can see the statistics of the data that has been processed. The statistics include the
				minimum, maximum, average, and standard deviation of the data.
			</p>
		</article>
		<hr />
		<article class="guide">
			<div class="guide-element">
				<div class="btn btn-base w-min rounded-md">
					<i class="ri-computer-line"></i>
				</div>
				<p>Logs</p>
			</div>
			<p class="flex-2 text-left">
				You can see the logs of the data that has been processed. The logs include the time, data,
				and status of the data. You can also communicate with the device through the logs.
			</p>
		</article>
		<hr />
		<article class="guide">
			<div class="guide-element">
				<div class="btn btn-orange w-min">
					<i class="ri-bar-chart-fill"></i>
				</div>
				<p>Graph</p>
			</div>
			<p class="flex-2 text-left">
				You can see the graph of the data that has been processed. The graph includes the time and
				the data. You can also zoom in and out of the graph. You can also focus on either the raw
				data or the processed data.
			</p>
		</article>
		<hr />
		<article class="guide">
			<div class="guide-element">
				<div class="btn btn-purple w-min">
					<i class="ri-settings-line"></i>
				</div>
				<p>Record Settings</p>
			</div>
			<p class="flex-2 text-left">
				You can adjust the settings of the record. The settings include the name, unit, process,
				threshold, and setting of the record to match the device's data.
			</p>
		</article>
		<article class="guide">
			<div class="guide-element">
				<div class="btn btn-green w-min">
					<i class="ri-cpu-line"></i>
				</div>
				<p>Processor</p>
			</div>
			<p class="flex-2 text-left">
				You can process the data that has been recorded. The processor includes the window,
				intercept, slope, and target of the data. You can also see the processed data in the graph.
			</p>
		</article>
	</div>
	<Button ariaLabel="Back to home" color="btn-blue mx-auto" onClick={() => goto(base + '/')}>
		<i class="ri-home-fill"></i>
		<span class="text-sm">Back to home</span>
	</Button>
</main>
