"use client";

import { useRef, useState, useCallback } from "react";

type TiltStyle = {
  transform: string;
  transition: string;
};

type UseTiltOptions = {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  transitionSpeed?: number;
};

export const useTilt = (options: UseTiltOptions = {}) => {
  const {
    maxTilt = 15,
    perspective = 1000,
    scale = 1.02,
    transitionSpeed = 400,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<TiltStyle>({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`,
    transition: `transform ${transitionSpeed}ms ease-out`,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateY = (mouseX / (rect.width / 2)) * maxTilt;
      const rotateX = -(mouseY / (rect.height / 2)) * maxTilt;

      setStyle({
        transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transition: "transform 100ms ease-out",
      });
    },
    [maxTilt, perspective, scale]
  );

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`,
      transition: `transform ${transitionSpeed}ms ease-out`,
    });
  }, [perspective, transitionSpeed]);

  return {
    ref,
    style,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  };
};
