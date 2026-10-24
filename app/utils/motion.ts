// Tiny stand-in for motion-v: enter/exit use the Web Animations API, hover/press are CSS (see main.css).
export interface MotionValues { opacity?: number, x?: number, y?: number, scale?: number }
export interface MotionTransition { duration?: number, delay?: number, ease?: [number, number, number, number] }

const defaultEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function motionKeyframe(values: MotionValues): Keyframe {
  return {
    opacity: values.opacity ?? 1,
    transform: `translate(${values.x ?? 0}px, ${values.y ?? 0}px) scale(${values.scale ?? 1})`
  }
}

export function motionTiming(transition: MotionTransition = {}): KeyframeAnimationOptions {
  return {
    duration: (transition.duration ?? 0.2) * 1000,
    delay: (transition.delay ?? 0) * 1000,
    easing: `cubic-bezier(${(transition.ease ?? defaultEase).join(', ')})`,
    fill: 'backwards'
  }
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function animateMotion(element: Element, from: MotionValues, to: MotionValues, transition?: MotionTransition) {
  if (prefersReducedMotion()) return Promise.resolve()
  return element.animate([motionKeyframe(from), motionKeyframe(to)], motionTiming(transition)).finished.then(() => {}, () => {})
}
