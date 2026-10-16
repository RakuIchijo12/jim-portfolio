"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import Cursor from "@/app/components/motion/cursor";
import Preloader from "@/app/components/motion/preloader";
import { PageTransitionProvider } from "@/app/components/motion/page-transition";
import { SmoothScroll } from "@/app/components/motion/smooth-scroll";

const loadFeatures = () => import("@/app/lib/motion-features").then((mod) => mod.default);

/**
 * Global motion shell: lazy animation features, reduced-motion support for
 * every animation, Lenis smooth scrolling, the session intro, the route
 * curtain and the cursor follower.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures}>
      <MotionConfig reducedMotion="user">
        <PageTransitionProvider>
          {children}
          <Preloader />
          <Cursor />
        </PageTransitionProvider>
        <SmoothScroll />
      </MotionConfig>
    </LazyMotion>
  );
}
