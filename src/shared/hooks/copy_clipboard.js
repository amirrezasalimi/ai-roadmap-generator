export default function copyToClipboard(text) {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        return navigator.clipboard.writeText(text);
    return Promise.reject('The Clipboard API is not available.');
}