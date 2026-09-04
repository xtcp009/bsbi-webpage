import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}

export function playWhenInView(element: Element, play: () => void, start = "top 88%") {
  const st = ScrollTrigger.create({
    trigger: element,
    start,
    once: true,
    onEnter: play,
  });

  const maybePlay = () => {
    ScrollTrigger.refresh();
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 32) play();
  };

  requestAnimationFrame(maybePlay);
  window.addEventListener("load", maybePlay, { once: true });

  return () => {
    st.kill();
    window.removeEventListener("load", maybePlay);
  };
}
