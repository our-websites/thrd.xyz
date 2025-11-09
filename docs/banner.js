async function loadBanner() {
  const bannerId = 'thrd-banner';
  let banner = document.getElementById(bannerId);

  try {
    const response = await fetch('https://api.thrd.xyz/banner');
    const data = await response.json();
    const bannerText = data.banner || '';

    // Don't show anything if there's no banner
    if (bannerText === 'No set banner' || !bannerText.trim()) {
      if (banner) banner.remove();
      return;
    }

    // Create banner element if needed
    if (!banner) {
      banner = document.createElement('div');
      banner.id = bannerId;
      banner.style.cssText =
        'position:fixed;top:0;left:0;right:0;background:linear-gradient(90deg, #ff7518, #ffb347);color:#1a1a1a;text-align:center;padding:12px 20px;font-weight:bold;font-size:0.9rem;z-index:150;transition:all 0.3s ease;box-shadow:0 2px 8px rgba(255,117,24,0.2);';
      document.body.insertBefore(banner, document.body.firstChild);
    }

    banner.textContent = bannerText;
    banner.style.display = 'block';
  } catch (error) {
    console.warn('Banner API error:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadBanner);
} else {
  loadBanner();
}
