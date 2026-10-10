// Fade out before navigating between portfolio pages; CSS handles entry.
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pages = new Set(['index.html', 'project1.html', 'project2.html', 'project3.html', 'project4.html']);
  let leaving = false;
  window.addEventListener('pageshow', () => {
    leaving = false;
    document.body.classList.remove('page-leaving');
  });
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || link.hasAttribute('download') || (link.target && link.target !== '_self') || reducedMotion.matches) return;
    const destination = new URL(link.href, location.href);
    const current = new URL(location.href);
    if (destination.origin !== current.origin || destination.protocol !== current.protocol || destination.pathname.slice(0, destination.pathname.lastIndexOf('/') + 1) !== current.pathname.slice(0, current.pathname.lastIndexOf('/') + 1) || !pages.has(destination.pathname.split('/').pop()) || destination.pathname === current.pathname) return;
    event.preventDefault();
    if (leaving) return;
    leaving = true;
    document.body.classList.add('page-leaving');
    window.setTimeout(() => location.assign(destination.href), 250);
  });
})();
