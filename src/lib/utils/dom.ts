export function scrollIntoViewInsideElement(
	element: HTMLElement | null,
	targetElement: HTMLElement | null
): void {
	if (!element || !targetElement) {
		return;
	}

	const elementRect = element.getBoundingClientRect();
	const targetRect = targetElement.getBoundingClientRect();

	if (
		targetRect.top >= elementRect.top &&
		targetRect.bottom <= elementRect.bottom &&
		targetRect.left >= elementRect.left &&
		targetRect.right <= elementRect.right
	) {
		return;
	}

	const scrollTop = targetRect.top - elementRect.top + element.scrollTop;
	const scrollLeft = targetRect.left - elementRect.left + element.scrollLeft;

	element.scrollTop = scrollTop - (elementRect.height - targetRect.height) / 2;
	element.scrollLeft = scrollLeft - (elementRect.width - targetRect.width) / 2;
}
