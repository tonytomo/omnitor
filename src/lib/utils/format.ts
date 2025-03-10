export const formatISODate = (date: string) => {
	return new Date(date).toLocaleString('id-ID', {
		year: 'numeric',
		month: '2-digit',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	});
};
