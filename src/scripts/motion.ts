// Site-wide motion. Runs on every page load, including client-side navigations.
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let cleanups: (() => void)[] = [];

function reveals() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)');
  // Stagger siblings inside [data-stagger] containers.
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
    const step = Number(group.dataset.stagger) || 80;
    group.querySelectorAll<HTMLElement>(':scope > [data-reveal]').forEach((el, i) => {
      el.style.setProperty('--d', `${i * step}ms`);
    });
  });
  if (reduced() || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-in');
        e.target.dispatchEvent(new CustomEvent('reveal'));
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );
  els.forEach((el) => io.observe(el));
  cleanups.push(() => io.disconnect());
}

// Nav: tucks away on scroll down, returns on scroll up; gets a backdrop once scrolled.
function nav() {
  const bar = document.querySelector<HTMLElement>('[data-nav]');
  const progress = document.querySelector<HTMLElement>('[data-progress]');
  let last = window.scrollY;
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    if (bar) {
      bar.classList.toggle('is-scrolled', y > 8);
      bar.classList.toggle('is-hidden', y > 240 && y > last + 2 && !bar.contains(document.activeElement));
      if (y < last - 2) bar.classList.remove('is-hidden');
    }
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    }
    last = y;
    ticking = false;
  };
  const onScroll = () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  };
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  cleanups.push(() => window.removeEventListener('scroll', onScroll));
}

// Cards follow the pointer slightly (screenshot parallax + soft spotlight).
function tilt() {
  if (reduced() || !window.matchMedia('(hover: hover)').matches) return;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
    const move = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    };
    const leave = () => { card.style.setProperty('--mx', '0'); card.style.setProperty('--my', '0'); };
    card.addEventListener('pointermove', move);
    card.addEventListener('pointerleave', leave);
    cleanups.push(() => { card.removeEventListener('pointermove', move); card.removeEventListener('pointerleave', leave); });
  });
}

// Numbers count up when they scroll into view: <span data-count="48">48</span>
function counters() {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    const host = el.closest('[data-reveal]') ?? el;
    if (reduced()) return;
    el.textContent = '0';
    host.addEventListener('reveal', () => {
      const start = performance.now();
      const dur = 1400;
      const step = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 4))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { once: true });
  });
}

// Copy-to-clipboard buttons: <button data-copy="text">
function copy() {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
    const label = btn.querySelector<HTMLElement>('[data-copy-label]');
    const original = label?.textContent;
    const click = async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy!);
        btn.classList.add('is-copied');
        if (label) label.textContent = 'Copied';
        setTimeout(() => { btn.classList.remove('is-copied'); if (label) label.textContent = original!; }, 1800);
      } catch { /* clipboard blocked: the visible email still works */ }
    };
    btn.addEventListener('click', click);
    cleanups.push(() => btn.removeEventListener('click', click));
  });
}

document.addEventListener('astro:page-load', () => {
  reveals();
  nav();
  tilt();
  counters();
  copy();
});
document.addEventListener('astro:before-swap', () => {
  cleanups.forEach((fn) => fn());
  cleanups = [];
});
