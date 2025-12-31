"use client";

import { type ReactNode } from "react";
import { useTilt } from "../_hooks/useTilt";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
};

export const TiltCard = ({
  children,
  className = "",
  maxTilt = 10,
  scale = 1.02,
}: TiltCardProps) => {
  const { ref, style, handlers } = useTilt({ maxTilt, scale });

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      {...handlers}
    >
      {children}
    </div>
  );
};
