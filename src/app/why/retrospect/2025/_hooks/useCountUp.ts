"use client";

import { useEffect, useState, useRef, useCallback } from "react";

type UseCountUpOptions = {
  end: number;
  duration?: number;
  startOnView?: boolean;
  decimals?: number;
};

export const useCountUp = (options: UseCountUpOptions) => {
  const { end, duration = 2000, startOnView = true, decimals = 0 } = options;
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const startCounting = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);

    const startTime = performance.now();
    const startValue = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutExpo for smooth deceleration
      const easeProgress =
        progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      const currentValue = startValue + (end - startValue) * easeProgress;
      setCount(Number(currentValue.toFixed(decimals)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, duration, end, decimals]);

  useEffect(() => {
    if (!startOnView) {
      startCounting();
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCounting();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [startOnView, startCounting]);

  return { ref, count, hasStarted };
};
