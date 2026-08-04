interface CarEntry {
  rafId: number | null;
  progress: number;
  el: HTMLElement | null;
  lane: HTMLElement | null;
}
const registry = new Map<number, CarEntry>();

function trackWidthOf(el: HTMLElement, lane: HTMLElement): number {
  return Math.max(0, lane.clientWidth - el.offsetWidth);
}
function applyTransform(el: HTMLElement, lane: HTMLElement, progress: number): void {
  const trackWidth = trackWidthOf(el, lane);
  // eslint-disable-next-line no-param-reassign -- mutating the element, not reassigning the binding
  el.style.transform = `translateX(${progress * trackWidth}px)`;
}

function paintEntry(entry: CarEntry): void {
  if (entry.el && entry.lane) {
    applyTransform(entry.el, entry.lane, entry.progress);
  }
}
function cancelIfRunning(entry: CarEntry): void {
  if (entry.rafId !== null) {
    cancelAnimationFrame(entry.rafId);
  }
}
let resizeListenerRegistered = false;
function handleWindowResize(): void {
  registry.forEach((entry) => paintEntry(entry));
}
function ensureResizeListener(): void {
  if (resizeListenerRegistered) {
    return;
  }
  window.addEventListener('resize', handleWindowResize);
  resizeListenerRegistered = true;
}

export function registerCarTrack(id: number, el: HTMLElement, lane: HTMLElement): void {
  const existing = registry.get(id);
  const entry: CarEntry = existing
    ? { ...existing, el, lane }
    : { rafId: null, progress: 0, el, lane };
  registry.set(id, entry);
  paintEntry(entry);
  ensureResizeListener();
}

export function unregisterCarTrack(id: number): void {
  const entry = registry.get(id);
  if (entry) {
    registry.set(id, { ...entry, el: null, lane: null });
  }
}

function tick(id: number, startTime: number, durationMs: number, onFinish: () => void): void {
  const entry = registry.get(id);
  if (!entry) {
    return;
  }
  const progress = Math.min((performance.now() - startTime) / durationMs, 1);
  const updated: CarEntry = { ...entry, progress };
  paintEntry(updated);
  if (progress >= 1) {
    updated.rafId = null;
    registry.set(id, updated);
    onFinish();
    return;
  }
  updated.rafId = requestAnimationFrame(() => tick(id, startTime, durationMs, onFinish));
  registry.set(id, updated);
}

export function startCarAnimation(id: number, durationMs: number, onFinish: () => void): void {
  const entry = registry.get(id);
  if (!entry) {
    return;
  }
  cancelIfRunning(entry);
  const startTime = performance.now();
  const rafId = requestAnimationFrame(() => tick(id, startTime, durationMs, onFinish));
  registry.set(id, { ...entry, rafId });
}

export function stopCarAnimation(id: number): void {
  const entry = registry.get(id);
  if (!entry) {
    return;
  }
  cancelIfRunning(entry);
  registry.set(id, { ...entry, rafId: null });
}

export function resetCarPosition(id: number): void {
  const entry = registry.get(id);
  if (!entry) {
    return;
  }
  cancelIfRunning(entry);
  const updated: CarEntry = { ...entry, rafId: null, progress: 0 };
  registry.set(id, updated);
  paintEntry(updated);
}
