import { useEffect, useId, useRef } from 'react';
import './Avatar.css';

export type AvatarState = 'idle' | 'listening' | 'thinking' | 'speaking';

export interface AvatarProps {
  /** Face expression + mouth. Phase 1: always 'idle'. Phase 2: driven by ElevenLabs status. */
  state?: AvatarState;
  /** Rendered square size in px. Default 190. */
  size?: number;
  /** Force fully static regardless of media query. Test / escape hatch. */
  frozen?: boolean;
  /** Click/tap of the face. Phase 1: tiny reaction. Phase 2: toggle mic / start-stop. */
  onPoke?: () => void;
}

const MOUTH_SHAPES: Record<AvatarState, string> = {
  idle: 'M84 128 Q100 138 116 128',
  listening: 'M92 130 Q100 133 108 130',
  thinking: 'M90 131 Q100 129 110 133',
  speaking: 'M88 127 Q100 141 112 127',
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);

// Pupil travel limits in SVG units (socket rx 13 / ry 16, pupil r 5.5).
const MAX_X = 6.5;
const MAX_Y = 9.5;

export default function Avatar({
  state = 'idle',
  size = 190,
  frozen = false,
  onPoke,
}: AvatarProps) {
  const uid = useId().replace(/[:]/g, '');
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const eyesRef = useRef<SVGGElement>(null);
  const pupilLRef = useRef<SVGGElement>(null);
  const pupilRRef = useRef<SVGGElement>(null);

  // Keep the latest onPoke without re-running the effect.
  const onPokeRef = useRef(onPoke);
  onPokeRef.current = onPoke;

  useEffect(() => {
    const root = rootRef.current;
    const svg = svgRef.current;
    const eyes = eyesRef.current;
    const pupilL = pupilLRef.current;
    const pupilR = pupilRRef.current;
    if (!root || !svg || !pupilL || !pupilR) return;

    const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fineMq = window.matchMedia('(pointer: fine)');

    // --- gaze model (unit-disc space, -1..1) ---
    const pointer = { x: 0, y: 0, active: false };
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let lastMove = 0;
    let lastFrame = 0;
    let rafId: number | null = null;
    let lookActive = false;
    let reach = Math.min(window.innerWidth, window.innerHeight) * 0.6;

    const clampDisc = (x: number, y: number) => {
      const m = Math.hypot(x, y);
      return m > 1 ? { x: x / m, y: y / m } : { x, y };
    };

    const writePupils = () => {
      let px = cur.x * MAX_X;
      let py = cur.y * MAX_Y;
      const q = (px / MAX_X) ** 2 + (py / MAX_Y) ** 2;
      if (q > 1) {
        const s = 1 / Math.sqrt(q);
        px *= s;
        py *= s;
      }
      const t = `translate(${px.toFixed(2)}px, ${py.toFixed(2)}px)`;
      pupilL.style.transform = t;
      pupilR.style.transform = t;
      if (eyes) {
        eyes.style.transform = `translate(${(cur.x * 1.5).toFixed(2)}px, ${(
          cur.y * 1
        ).toFixed(2)}px)`;
      }
    };

    const settled = () =>
      Math.abs(target.x - cur.x) < 0.001 && Math.abs(target.y - cur.y) < 0.001;

    const frame = (now: number) => {
      const dt = lastFrame ? Math.min(now - lastFrame, 64) : 16.667;
      lastFrame = now;

      if (pointer.active && now - lastMove > 2500) pointer.active = false;

      if (lookActive) {
        // target already set by look-around / scroll-glance / tap
      } else if (pointer.active) {
        const rect = svg.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height * 0.46;
        const c = clampDisc((pointer.x - cx) / reach, (pointer.y - cy) / reach);
        target.x = c.x;
        target.y = c.y;
      } else {
        target.x = 0;
        target.y = 0;
      }

      const k = 1 - Math.pow(1 - 0.18, dt / 16.667);
      cur.x += (target.x - cur.x) * k;
      cur.y += (target.y - cur.y) * k;
      writePupils();

      if (!pointer.active && !lookActive && settled()) {
        rafId = null;
        lastFrame = 0;
        return;
      }
      rafId = requestAnimationFrame(frame);
    };

    const ensureRaf = () => {
      if (rafId == null) {
        lastFrame = 0;
        rafId = requestAnimationFrame(frame);
      }
    };

    // --- motion layer (built only when reduced-motion is off) ---
    let teardownMotion: (() => void) | null = null;

    const startMotion = () => {
      if (teardownMotion) return;
      const fine = fineMq.matches;

      let blinkTimer: number | undefined;
      let lookTimer: number | undefined;
      let lookReturnTimer: number | undefined;
      let tapTimer: number | undefined;
      let browTimer: number | undefined;
      let scrollTimer: number | undefined;
      let lastScrollY = window.scrollY;

      const releasePointer = () => {
        pointer.active = false;
        ensureRaf();
      };

      const onPointerMove = (e: PointerEvent) => {
        if (e.pointerType === 'touch') return;
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        pointer.active = true;
        lastMove = performance.now();
        ensureRaf();
      };
      const onWinMouseOut = (e: MouseEvent) => {
        if (!e.relatedTarget) releasePointer();
      };
      const onWinBlur = () => releasePointer();
      const onVisibility = () => {
        if (document.visibilityState === 'hidden') releasePointer();
      };
      const onResize = () => {
        reach = Math.min(window.innerWidth, window.innerHeight) * 0.6;
      };

      const blink = () => {
        root.classList.add('is-blinking');
        window.setTimeout(() => root.classList.remove('is-blinking'), 90);
      };
      const scheduleBlink = () => {
        blinkTimer = window.setTimeout(() => {
          blink();
          if (Math.random() < 0.12) window.setTimeout(blink, 190);
          scheduleBlink();
        }, rand(2800, 7000));
      };

      const scheduleLook = () => {
        lookTimer = window.setTimeout(() => {
          if (!pointer.active) {
            const a = Math.random() * Math.PI * 2;
            const r = Math.random() * 0.5;
            target.x = Math.cos(a) * r;
            target.y = Math.sin(a) * r;
            lookActive = true;
            ensureRaf();
            lookReturnTimer = window.setTimeout(() => {
              lookActive = false;
              ensureRaf();
            }, 700);
          }
          scheduleLook();
        }, rand(3000, 9000));
      };

      const onScroll = () => {
        const dy = window.scrollY - lastScrollY;
        lastScrollY = window.scrollY;
        target.y = Math.max(-0.5, Math.min(0.5, dy / 60));
        target.x *= 0.5;
        lookActive = true;
        ensureRaf();
        window.clearTimeout(scrollTimer);
        scrollTimer = window.setTimeout(() => {
          lookActive = false;
          ensureRaf();
        }, 400);
      };

      const onFacePointerDown = (e: PointerEvent) => {
        blink();
        onPokeRef.current?.();
        if (!fine) {
          const rect = svg.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height * 0.46;
          const c = clampDisc(
            (e.clientX - cx) / reach,
            (e.clientY - cy) / reach
          );
          target.x = c.x * 0.6;
          target.y = c.y * 0.6;
          lookActive = true;
          ensureRaf();
          window.clearTimeout(tapTimer);
          tapTimer = window.setTimeout(() => {
            lookActive = false;
            ensureRaf();
          }, 500);
        }
      };

      const onFaceEnter = () => root.classList.add('is-alert');
      const onFaceLeave = () => root.classList.remove('is-alert');

      const isInteractive = (t: EventTarget | null) =>
        t instanceof Element && !!t.closest('a, button, [role="button"]');
      const onDocClick = (e: MouseEvent) => {
        if (isInteractive(e.target)) blink();
      };
      const onDocPointerOver = (e: PointerEvent) => {
        if (isInteractive(e.target)) {
          window.clearTimeout(browTimer);
          root.classList.add('is-brow-raised');
        }
      };
      const onDocPointerOut = (e: PointerEvent) => {
        if (isInteractive(e.target)) {
          window.clearTimeout(browTimer);
          browTimer = window.setTimeout(
            () => root.classList.remove('is-brow-raised'),
            140
          );
        }
      };

      window.addEventListener('resize', onResize, { passive: true });
      window.addEventListener('blur', onWinBlur);
      document.addEventListener('visibilitychange', onVisibility);
      svg.addEventListener('pointerdown', onFacePointerDown, { passive: true });
      root.addEventListener('pointerenter', onFaceEnter);
      root.addEventListener('pointerleave', onFaceLeave);

      if (fine) {
        window.addEventListener('pointermove', onPointerMove, { passive: true });
        window.addEventListener('mouseout', onWinMouseOut);
        document.addEventListener('click', onDocClick, { passive: true });
        document.addEventListener('pointerover', onDocPointerOver, {
          passive: true,
        });
        document.addEventListener('pointerout', onDocPointerOut, {
          passive: true,
        });
      } else {
        window.addEventListener('scroll', onScroll, { passive: true });
      }

      scheduleBlink();
      scheduleLook();
      ensureRaf();

      teardownMotion = () => {
        window.removeEventListener('resize', onResize);
        window.removeEventListener('blur', onWinBlur);
        document.removeEventListener('visibilitychange', onVisibility);
        svg.removeEventListener('pointerdown', onFacePointerDown);
        root.removeEventListener('pointerenter', onFaceEnter);
        root.removeEventListener('pointerleave', onFaceLeave);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('mouseout', onWinMouseOut);
        document.removeEventListener('click', onDocClick);
        document.removeEventListener('pointerover', onDocPointerOver);
        document.removeEventListener('pointerout', onDocPointerOut);
        window.removeEventListener('scroll', onScroll);
        window.clearTimeout(blinkTimer);
        window.clearTimeout(lookTimer);
        window.clearTimeout(lookReturnTimer);
        window.clearTimeout(tapTimer);
        window.clearTimeout(browTimer);
        window.clearTimeout(scrollTimer);
        if (rafId != null) cancelAnimationFrame(rafId);
        rafId = null;
        lookActive = false;
        pointer.active = false;
        root.classList.remove('is-blinking', 'is-alert', 'is-brow-raised');
        cur.x = cur.y = target.x = target.y = 0;
        writePupils();
      };
    };

    const stopMotion = () => {
      teardownMotion?.();
      teardownMotion = null;
    };

    const apply = () => {
      if (reduceMq.matches || frozen) stopMotion();
      else startMotion();
    };
    apply();

    const onReduceChange = () => apply();
    const onFineChange = () => {
      if (teardownMotion) {
        stopMotion();
        startMotion();
      }
    };
    reduceMq.addEventListener('change', onReduceChange);
    fineMq.addEventListener('change', onFineChange);

    return () => {
      reduceMq.removeEventListener('change', onReduceChange);
      fineMq.removeEventListener('change', onFineChange);
      stopMotion();
    };
  }, [frozen]);

  return (
    <div
      ref={rootRef}
      className={`avatar avatar--${state}`}
      aria-hidden="true"
      style={{ width: size, height: size }}
    >
      <svg
        ref={svgRef}
        className="avatar__svg"
        viewBox="0 0 200 200"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id={`socket-l-${uid}`}>
            <ellipse cx="78" cy="92" rx="13" ry="16" />
          </clipPath>
          <clipPath id={`socket-r-${uid}`}>
            <ellipse cx="122" cy="92" rx="13" ry="16" />
          </clipPath>
        </defs>

        <g className="avatar__body">
          {/* head — clean rounded oval, no neck */}
          <path
            className="avatar__head"
            d="M100 30C67 30 54 54 54 84c0 28 16 66 46 66s46-38 46-66c0-30-13-54-46-54Z"
            fill="var(--bg-subtle)"
            stroke="var(--border-strong)"
            strokeWidth="2.2"
          />
          {/* hair — simple cap on the crown */}
          <path
            className="avatar__accent"
            d="M100 28C72 28 53 47 52 74c0 0 8-14 48-14s48 14 48 14c-1-27-20-46-48-46Z"
            fill="var(--accent)"
          />

          <g className="avatar__brows">
            <path
              className="avatar__brow avatar__brow--l"
              d="M67 80q11-6 21-1"
              stroke="var(--text)"
              strokeWidth="2.6"
              strokeLinecap="round"
              fill="none"
            />
            <path
              className="avatar__brow avatar__brow--r"
              d="M112 79q11-5 21 1"
              stroke="var(--text)"
              strokeWidth="2.6"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          <g className="avatar__eyes" ref={eyesRef}>
            <g className="avatar__eye avatar__eye--l">
              <ellipse
                className="avatar__sclera"
                cx="78"
                cy="92"
                rx="12.5"
                ry="15"
                fill="var(--surface)"
                stroke="var(--border-strong)"
                strokeWidth="2"
              />
              <g clipPath={`url(#socket-l-${uid})`}>
                <g className="avatar__pupil" ref={pupilLRef}>
                  <circle cx="78" cy="93" r="6" fill="var(--text)" />
                  <circle cx="80.4" cy="90.2" r="1.9" fill="var(--surface)" />
                </g>
              </g>
            </g>

            <g className="avatar__eye avatar__eye--r">
              <ellipse
                className="avatar__sclera"
                cx="122"
                cy="92"
                rx="12.5"
                ry="15"
                fill="var(--surface)"
                stroke="var(--border-strong)"
                strokeWidth="2"
              />
              <g clipPath={`url(#socket-r-${uid})`}>
                <g className="avatar__pupil" ref={pupilRRef}>
                  <circle cx="122" cy="93" r="6" fill="var(--text)" />
                  <circle cx="124.4" cy="90.2" r="1.9" fill="var(--surface)" />
                </g>
              </g>
            </g>

            {/* blink lids — cover the eye when .is-blinking */}
            <path
              className="avatar__lid avatar__lid--l"
              d="M64 92a14 15 0 0 1 28 0a14 15 0 0 1 -28 0Z"
              fill="var(--bg-subtle)"
            />
            <path
              className="avatar__lid avatar__lid--r"
              d="M108 92a14 15 0 0 1 28 0a14 15 0 0 1 -28 0Z"
              fill="var(--bg-subtle)"
            />
          </g>

          <path
            className="avatar__mouth"
            d={MOUTH_SHAPES[state]}
            stroke="var(--text)"
            strokeWidth="2.6"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
