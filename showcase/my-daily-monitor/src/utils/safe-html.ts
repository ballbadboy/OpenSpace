/**
 * SECURITY: Safe HTML interpolation utilities to prevent XSS attacks.
 *
 * IMPORTANT: Always use these when setting innerHTML with dynamic content.
 * Do NOT set innerHTML directly with unescaped user/API data.
 */

/**
 * Escapes HTML special characters for safe use in innerHTML.
 * Converts &, <, >, ", and ' to their HTML entity equivalents.
 */
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Sanitizes URLs to prevent javascript: and data: injection.
 * Only allows http:// and https:// URLs.
 */
export function sanitizeUrl(raw: unknown): string {
  const s = String(raw ?? '').trim();
  return /^https?:\/\//i.test(s) ? s : '#';
}

/**
 * Safely sets innerHTML with escaped HTML.
 * USE THIS when the content is dynamic/untrusted.
 *
 * EXAMPLE:
 *   setSafeHtml(el, `<h1>${escapeHtml(title)}</h1>`)
 */
export function setSafeHtml(element: HTMLElement, html: string): void {
  element.innerHTML = html;
}

/**
 * Template literal tag for safe HTML (auto-escapes interpolations).
 *
 * EXAMPLE:
 *   el.innerHTML = safeHtml`<div>${title}</div>`;
 *   // Equivalent to: el.innerHTML = `<div>${escapeHtml(title)}</div>`;
 */
export function safeHtml(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string {
  let result = strings[0];
  for (let i = 0; i < values.length; i++) {
    result += escapeHtml(values[i]) + strings[i + 1];
  }
  return result;
}
