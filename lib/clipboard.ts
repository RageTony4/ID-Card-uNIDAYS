/**
 * Copies text to clipboard reliably across modern browsers and iframe sandboxes
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  if (!text) return false;

  // Try modern Clipboard API
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    console.warn('Modern clipboard API write failed, trying fallback:', err);
  }

  // Fallback for iframe environments or restricted permissions
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const success = document.execCommand('copy');
    textArea.remove();
    return success;
  } catch (err) {
    console.error('Fallback clipboard copy failed:', err);
    return false;
  }
}
