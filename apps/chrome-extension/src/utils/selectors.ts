export function getStableSelector(el: Element | null): string | undefined {
  if (!el) return undefined;

  const testId = el.getAttribute('data-testid');
  if (testId) return `[data-testid="${testId}"]`;

  const ariaLabel = el.getAttribute('aria-label');
  if (ariaLabel) return `${el.tagName.toLowerCase()}[aria-label="${ariaLabel}"]`;

  if (el.id) return `#${el.id}`;

  return el.tagName.toLowerCase();
}
