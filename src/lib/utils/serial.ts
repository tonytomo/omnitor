export async function connectToSerialDevice() {
	try {
		// Request access to a serial port
		const port = await navigator.serial.requestPort();

		if (!port) {
			console.error('No serial port found');
			return false;
		}

		// Open the serial port with the desired baud rate
		await port.open({ baudRate: 9600 });

		console.log('Connected to serial port');

		// Read data from the device
		const reader = port.readable?.getReader();
		while (true) {
			const { value, done } = await reader?.read();
			if (done) {
				console.log('Stream closed');
				break;
			}
			console.log('Received data:', new TextDecoder().decode(value));
		}
	} catch (error) {
		console.error('Error connecting to serial device:', error);
	}
}
