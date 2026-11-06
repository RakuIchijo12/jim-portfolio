"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import Cursor from "@/app/components/motion/cursor";
import Preloader from "@/app/components/motion/preloader";
import { PageTransitionProvider } from "@/app/components/motion/page-transition";
import RenderWarmup from "@/app/components/motion/render-warmup";
import { SmoothScroll } from "@/app/components/motion/smooth-scroll";
import CommandPalette from "@/app/components/command-palette";

const loadFeatures = () => import("@/app/lib/motion-features").then((mod) => mod.default);

/**
 * Global shell: lazy animation features, reduced-motion support for every
 * animation, Lenis smooth scrolling, the boot screen, the route panel, the
 * command palette, the cursor follower, and the idle warm-up that lets
 * below-the-fold blocks skip rendering without losing their real height.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures}>
      <MotionConfig reducedMotion="user">
        <PageTransitionProvider>
          {children}
          <Preloader />
          <CommandPalette />
          <Cursor />
        </PageTransitionProvider>
        <SmoothScroll />
        <RenderWarmup />
      </MotionConfig>
    </LazyMotion>
  );
}
