export function saveShortUrl(shortcode, fullUrl, expiryMinutes) {
  const expiry = Date.now() + expiryMinutes * 60 * 1000;
  const entry = { fullUrl, expiry };
  localStorage.setItem(shortcode, JSON.stringify(entry));
}

export function getUrl(shortcode) {
  const data = JSON.parse(localStorage.getItem(shortcode));
  if (!data) return null;
  if (Date.now() > data.expiry) {
    localStorage.removeItem(shortcode);
    return null;
  }
  return data.fullUrl;
}
